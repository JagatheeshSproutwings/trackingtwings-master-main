import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Select, DatePicker, Row, Col, notification } from "antd";
import {
  SearchOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import api from "configs/apiConfig";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet-rotatedmarker";
import "leaflet-arrowheads";
const { Option } = Select;
const { RangePicker } = DatePicker;

export const PlaybackHistory = ({ parentToChild, ...props }) => {
  const [startCoordinate, setStartCoordinate] = useState(null);
  const [endCoordinate, setEndCoordinate] = useState(null);
  const [polylineRef, setPolylineRef] = useState(null);

  const [isPaused, setIsPaused] = useState(false);
  const handlePauseClick = () => {
    setIsPaused(true);
  };
  const handlePlayClick = () => {
    setIsPaused(false);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [polylineData, setPolylineData] = useState([]);
  const [isShowButton, setShowButton] = useState(false);
  const [moveInterval, setMoveInterval] = useState("1000");

  const getUser = () => {
    return localStorage.getItem("id");
  };
  const user = getUser();
  const getRole = () => {
    return localStorage.getItem("role");
  };
  const role = getRole();

  useEffect(() => {
    fetchVehicleOptions();
  }, []);

  const fetchVehicleOptions = async () => {
    try {
      setVehicleOptions([]);

      if (role == 6) {
        const data = { user_id: user };
        const response = await api.post("report_vehicle_list", data);
        if (response.data.success) {
          setVehicleOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } else {
        const data = { user_id: parentToChild };
        const response = await api.post("report_vehicle_list", data);
        if (response.data.success) {
          setVehicleOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      }
    } catch (error) {
      console.error("Error fetching vehicle options:", error);
    }
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleVehicleIdChange = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleSearchClick = async () => {
    const data = {
      start_day: selectedDateRange
        ? selectedDateRange[0].format("YYYY-MM-DD HH:mm:ss")
        : null,
      end_day: selectedDateRange
        ? selectedDateRange[1].format("YYYY-MM-DD HH:mm:ss")
        : null,
      deviceimei: selectedVehicleId === "0" ? null : selectedVehicleId,
      user_id: parentToChild,
    };
    setMultiVehicles([]);
    setShowButton(false);
    try {
      const parking_data = await api.post("get_playback_report", data);
      if (parking_data.data && Array.isArray(parking_data.data.data)) {
        const processedData = parking_data.data.data.map((item, index) => ({
          s_no: index + 1,
          id: item.id,
          vehicle_name: item.vehicle_name,
          device_imei: item.device_imei,

          latitude: item.latitude,
          longitude: item.longitude,
          speed: item.speed,
          angle: item.angle,

          odometer: item.odometer,
          device_datetime: item.device_datetime,
          ignition: item.ignition,
          ac_status: item.ac_status,
        }));
        setShowButton(true);
        setMultiVehicles(processedData);
      } else {
        setShowButton(false);
        setMultiVehicles([]);
        openNotification("error", "Playback", "No Playback Found");
      }
    } catch (err) {
      setShowButton(false);
      setMultiVehicles([]);
      openNotification("error", "Playback", "No Playback Found");
    }
  };

  const handleSpeedChange = async (value) => {
    setMoveInterval(value);
  };

  const resetMap = () => {
    mapRef.current.eachLayer((layer) => {
      // Remove all layers except the base layers
      if (!(layer instanceof L.TileLayer)) {
        layer.remove();
      }
    });

    mapRef.current.setView(position, 12);
    setPolylineData([]);
    setPolylineCoordinates([]);
    setStartCoordinate(null);
    setEndCoordinate(null);
  };

  // const moveInterval = 1000;

  const [multiVehicles, setMultiVehicles] = useState([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(null);

  useEffect(() => {
    const coordinates = multiVehicles.map((item) => [
      item.latitude,
      item.longitude,
    ]);
    setPolylineData(coordinates);

    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        if (currentMarkerIndex < multiVehicles.length) {
          const vehicle = multiVehicles[currentMarkerIndex];
          const newPosition = [vehicle.latitude, vehicle.longitude];
          const newRotationAngle = vehicle.angle;

          if (currentMarkerIndex === 0) {
            // Set the start coordinate for the marker
            setStartCoordinate([vehicle.latitude, vehicle.longitude]);
          } else if (currentMarkerIndex === multiVehicles.length - 1) {
            // Set the end coordinate for the marker
            setEndCoordinate([vehicle.latitude, vehicle.longitude]);
          }

          // Remove previous marker and popup
          if (currentMarker) {
            currentMarker.remove();
          }
          if (currentPopup) {
            currentPopup.remove();
          }

          // Add a new marker at the current position
          const newMarker = L.marker(newPosition, {
            icon: customIcon,
            rotationAngle: newRotationAngle,
            keepCenter: true,
          }).addTo(mapRef.current);

          // Save the new marker reference
          setCurrentMarker(newMarker);

          const polyline = L.polyline(polylineCoordinates, {
            color: "blue",
          }).addTo(mapRef.current);
          setPolylineRef(polyline);
          // Add arrowheads to the Polyline using the arrowheads extension
          polyline.arrowheads({
            arrowheadLength: "20px",
            color: "green",
            arrowheadFrequency: "endonly",
          });

          // Add a new popup at the current position
          const newPopup = L.popup({
            style: {
              fontSize: "12px",
              padding: "0px",
              margin: "0px",
              background: "lightblue",
            },
          })
            .setLatLng(newPosition)
            .setContent(
              `
              <div>
                Vehicle Name: <b>${vehicle?.vehicle_name || ""}</b><br />
                Speed: <b>${vehicle?.speed} KMPH</b><br />
                Last Updated at: <b>${
                  vehicle?.device_datetime
                } (HH:MM:SS)</b><br />
                Odometer: <b>${vehicle?.odometer} </b>
              </div>
            `
            )
            .openOn(mapRef.current);

          // Save the new popup reference
          setCurrentPopup(newPopup);

          // Add the new position to the polyline coordinates
          setPolylineCoordinates([...polylineCoordinates, newPosition]);

          // Move to the next marker
          setCurrentMarkerIndex(currentMarkerIndex + 1);
        } else {
          // If all markers have been processed, clear the interval
          clearInterval(intervalId);
        }
      }, moveInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [
    multiVehicles,
    currentMarkerIndex,
    currentMarker,
    currentPopup,
    polylineCoordinates,
    isPaused,
  ]);

  const position = [11.0467, 76.9254];
  const { BaseLayer } = LayersControl;

  const mapRef = useRef(null);

  const customIcon = new L.Icon({
    iconUrl: "/img/ICONS/GREEN/car.png",
    iconSize: [32, 32], // Adjust the size as needed
    iconAnchor: [16, 32], // Anchor point for the icon
    popupAnchor: [0, -32], // Anchor point for popups relative to the icon
  });

  const handleStopClick = () => {
    setPolylineData([]);
    setMultiVehicles([]);
    setCurrentMarkerIndex(0);
    setPolylineCoordinates([]);
    setStartCoordinate(null);
    setEndCoordinate(null);

    if (currentMarker) {
      currentMarker.remove();
    }
    if (currentPopup) {
      currentPopup.remove();
    }
    setShowButton(false);

    // Remove the polyline if it exists
    if (polylineRef) {
      mapRef.current.removeLayer(polylineRef);
    }

    if (currentMarker) {
      currentMarker.remove();
    }
    if (currentPopup) {
      currentPopup.remove();
    }
    setShowButton(false);

    // Remove the polyline if it exists
    if (polylineRef) {
      polylineRef.remove();
    }

    // Reset the map
    resetMap();
  };

  return (
    <>
      <Card title="Playback History">
        <Row>
          <Col span={8} order={1}>
            <RangePicker
              showTime
              name="range_picker"
              format={"YYYY-MM-DD hh:mm:ss"}
              onChange={handleDateRangeChange}
            />
          </Col>
          <Col span={4} order={2}>
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              defaultValue="All"
              className="w-100"
              name="device_imei"
              placeholder="Vehicle"
              onChange={handleVehicleIdChange}
              value={selectedVehicleId}
            >
              {Array.isArray(vehicleOptions) ? (
                vehicleOptions.map((vehicle) => (
                  <Option key={vehicle.device_imei} value={vehicle.device_imei}>
                    {vehicle.vehicle_name + " - " + vehicle.device_imei}
                  </Option>
                ))
              ) : (
                <Option value="Loading">Loading...</Option>
              )}
            </Select>
          </Col>

          <Col span={12} order={3}>
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              success
              icon={<SearchOutlined />}
              onClick={handleSearchClick}
            >
              Search
            </Button>
            {isShowButton && (
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                danger
                icon={<PauseOutlined />}
                onClick={handlePauseClick}
                disabled={isPaused}
              >
                Pause
              </Button>
            )}
            {isShowButton && (
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={handlePlayClick}
                disabled={!isPaused}
              >
                Play
              </Button>
            )}
            {isShowButton && (
              <Button
                style={{ marginLeft: "10px" }}
                type="primary"
                success
                icon={<StopOutlined />}
                onClick={handleStopClick}
              >
                Stop
              </Button>
            )}
            {isShowButton && (
              <Select
                defaultValue="All"
                name="device_imei"
                style={{ marginLeft: "5px" }}
                onChange={handleSpeedChange}
                value={moveInterval}
              >
                <Option value="2000">Slow</Option>
                <Option value="1000">Normal</Option>
                <Option value="350">Speed</Option>
              </Select>
            )}
          </Col>
        </Row>

        <div>
          <Row>
            <Col span={24}>
              <MapContainer
                style={{ height: "500px" }}
                ref={mapRef}
                center={position}
                zoom={12}
                keepCenter={true}
                scrollWheelZoom={true}
              >
                {polylineData.length > 0 && (
                  <Polyline positions={polylineData} color="blue" />
                )}
                <LayersControl>
                  <BaseLayer name="OpenStreetMap">
                    <TileLayer
                      url="http://198.204.245.190/osm/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </BaseLayer>
                  <BaseLayer checked name="Google-Street View">
                    <TileLayer
                      attribution="Google Maps"
                      url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                    />
                  </BaseLayer>
                  <BaseLayer name="Google-Satelite">
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                      maxZoom={20}
                      subdomains={["mt1", "mt2", "mt3"]}
                    />
                  </BaseLayer>
                </LayersControl>
                {startCoordinate && (
                  <Marker position={startCoordinate}>
                    <Popup>
                      Start Point:
                      <br />
                      Latitude: {startCoordinate[0]}
                      <br />
                      Longitude: {startCoordinate[1]}
                    </Popup>
                  </Marker>
                )}

                {/* Add a marker for the end coordinate */}
                {endCoordinate && (
                  <Marker position={endCoordinate}>
                    <Popup>
                      End Point:
                      <br />
                      Latitude: {endCoordinate[0]}
                      <br />
                      Longitude: {endCoordinate[1]}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default PlaybackHistory;
