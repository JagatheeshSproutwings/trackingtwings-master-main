import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Select, DatePicker, Row, Col } from "antd";
import Flex from "components/shared-components/Flex";
import {
  SearchOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import api from "configs/apiConfig";
import L from "leaflet";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet-rotatedmarker";
import { Polyline } from "react-leaflet";

const { Option } = Select;
const { RangePicker } = DatePicker;

export const PlaybackHistory = ({ parentToChild, ...props }) => {
  const [isPaused, setIsPaused] = useState(false);
  const handlePauseClick = () => {
    setIsPaused(true);
  };
  const handlePlayClick = () => {
    setIsPaused(false);
  };

  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
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
        const response = await api.post("vehicle_list", data);
        if (response.data.success) {
          setVehicleOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } else {
        const data = { user_id: parentToChild };
        const response = await api.post("vehicle_list", data);
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
        console.log(processedData);
        setMultiVehicles(processedData);
      } else {
        setMultiVehicles([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const moveInterval = 500;

  const [multiVehicles, setMultiVehicles] = useState([]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(null);

  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        if (currentMarkerIndex < multiVehicles.length) {
          const vehicle = multiVehicles[currentMarkerIndex];
          const newPosition = [vehicle.latitude, vehicle.longitude];
          const newRotationAngle = vehicle.angle;

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
                Last Updated at: <b>${vehicle?.device_datetime}</b><br />
                Odometer: <b>${vehicle?.odometer} (HH:MM:SS)</b>
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

  return (
    <>
      <Card title="Playback History">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mobileFlex={false}
        >
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mr-3">
              <RangePicker
                showTime
                name="range_picker"
                format={"YYYY-MM-DD hh:mm:ss"}
                onChange={handleDateRangeChange}
              />
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                defaultValue="All"
                className="w-100"
                style={{ minWidth: 180 }}
                name="device_imei"
                placeholder="Vehicle"
                onChange={handleVehicleIdChange}
                value={selectedVehicleId}
              >
                <Option value="All">All</Option>
                {Array.isArray(vehicleOptions) ? (
                  vehicleOptions.map((vehicle) => (
                    <Option
                      key={vehicle.device_imei}
                      value={vehicle.device_imei}
                    >
                      {vehicle.vehicle_name}
                    </Option>
                  ))
                ) : (
                  <Option value="Loading">Loading...</Option>
                )}
              </Select>
            </div>

            <div className="mb-3 mr-3">
              <Button
                type="primary"
                success
                icon={<SearchOutlined />}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </div>
          </Flex>
        </Flex>

        <div className="mb-3 mr-3">
          <Button
            type="primary"
            danger
            icon={<PauseOutlined />}
            onClick={handlePauseClick}
            disabled={isPaused}
          >
            Pause
          </Button>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handlePlayClick}
            disabled={!isPaused}
          >
            Play
          </Button>
        </div>
        <div>
          <Row>
            <Col span={24}>
              <MapContainer
                ref={mapRef}
                center={position}
                zoom={12}
                keepCenter={true}
                scrollWheelZoom={true}
              >
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
                <Polyline
                  positions={polylineCoordinates}
                  color="blue" // You can customize the color and other properties
                />
              </MapContainer>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default PlaybackHistory;
