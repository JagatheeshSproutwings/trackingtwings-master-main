import React, { useState, useEffect } from "react";
import { Button, Card, Select, DatePicker } from "antd";
import Flex from "components/shared-components/Flex";
import { SearchOutlined } from "@ant-design/icons";
import api from "configs/apiConfig";
import LiveTrackings from "components/map-components/live_tracking_map_copy";

const { Option } = Select;
const { RangePicker } = DatePicker;
export const PlaybackHistory = () => {
  const [mapvehicleDate, setmapvehicleDate] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const SingleVehicle = async () => {
    try {
      const device_imei = "865167041351702";
      const singlevehicles_data = await api
        .get(`single_dashboard/${device_imei}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });

      const processedData = singlevehicles_data?.data?.data;

      const mapData = [
        {
          id: processedData?.id,
          device_imei: processedData?.device_imei,
          title: processedData?.vehicle_name || "TEST",
          latitude: processedData?.lattitute || 0.0,
          longtitude: processedData?.longitute || 0.0,
          angle: processedData?.angle || 0,
          speed: processedData?.speed || 0,
          icon_url:
            vehicle_icon_url(processedData?.vehicle_current_status) +
            processedData?.short_name +
            ".png",
          device_time:
            processedData?.device_updatedtime || "0000-00-00 00:00:00",
        },
      ];
      // console.log(Array.isArray(mapData) ? "True" : "False");
      setmapvehicleDate(mapData);
    } catch (error) {
      console.error("Error Fetching Vehicle Data");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      SingleVehicle();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const vehicle_icon_url = (status) => {
    switch (status) {
      case 1:
        return "/img/ICONS/BLUE/";
        break;
      case 2:
        return "/img/ICONS/YELLOW/";
        break;
      case 3:
        return "/img/ICONS/GREEN/";
        break;
      case 4:
        return "/img/ICONS/RED/";
        break;
      case 5:
        return "/img/ICONS/GRAY/";
        break;
      case 6:
        return "/img/ICONS/PURPLE/";
        break;
      default:
        return "/img/ICONS/GRAY/";
        break;
    }
  };

  const Playback = () => {
    const data = {
      start_day: selectedDateRange
        ? selectedDateRange[0].format("YYYY-MM-DD HH:mm:ss")
        : null,
      end_day: selectedDateRange
        ? selectedDateRange[1].format("YYYY-MM-DD HH:mm:ss")
        : null,
      device_imei: selectedVehicleId === "0" ? null : selectedVehicleId,
    };

    console.log("Selected Vehicle ID:", data);
  };

  const getUser = () => {
    return localStorage.getItem("id");
  };
  const user = getUser();

  const fetchVehicleOptions = async () => {
    try {
      const data = { user_id: user };
      const response = await api.post("vehicle_list", data);
      if (response.data.success) {
        setVehicleOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching vehicle options:", error);
    }
  };

  useEffect(() => {
    fetchVehicleOptions();
  }, []);

  const handleVehicleIdChange = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

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
                onChange={handleDateRangeChange}
                showTime
                name="date_range"
              />
            </div>
            <div className="mr-md-3 mb-3">
              <Select
                showSearch
                optionFilterProp="children"
                style={{ minWidth: 180 }}
                name="vehicle_id"
                placeholder="Vehicle"
                onChange={handleVehicleIdChange}
                value={selectedVehicleId}
              >
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

            <div className="mb-3">
              <Button
                type="primary"
                success
                icon={<SearchOutlined />}
                onClick={Playback}
              >
                Search
              </Button>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <LiveTrackings data={mapvehicleDate}></LiveTrackings>
        </div>
      </Card>
    </>
  );
};

export default PlaybackHistory;
