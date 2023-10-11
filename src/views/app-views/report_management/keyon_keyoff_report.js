import React, { useState, useEffect } from "react";
import { Card, Table, Button, Select, DatePicker } from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
const { Option } = Select;
const { RangePicker } = DatePicker;

const KeyOnKeyOffReport = ({ parentToChild, ...props }) => {
  const [KeyOnOffList, setKeyOnOffList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("All");
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const tableColumns = [
    {
      title: "S No",
      dataIndex: "s_no",
      fixed: "left",
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicle_name",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
    },
    {
      title: "Start Location",
      dataIndex: "start_location",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
    },
    {
      title: "End Time",
      dataIndex: "end_location",
    },
    {
      title: "Maximum Speed",
      dataIndex: "max_speed",
    },
    {
      title: "Average Speed",
      dataIndex: "avg_speed",
    },
    {
      title: "Distance (KM)",
      dataIndex: "distance",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Map View",
      dataIndex: "map_view",
    },
  ];

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
      device_imei: selectedVehicleId === "0" ? null : selectedVehicleId,
      user_id: parentToChild,
    };

    setKeyOnOffList([]); // Clear previous data
    setIsLoading(true);

    try {
      const keyonoff_data = await api.post("get_keyonoff_report", data);

      if (keyonoff_data.data && Array.isArray(keyonoff_data.data.data)) {
        const processedData = keyonoff_data.data.data.map((item, index) => ({
          s_no: index + 1,
          id: item.id,
          vehicle_name: item.vehicle_name,
          start_time: item.start_datetime,
          start_location: item.start_latitude + ":" + item.start_longitude,
          end_time: item.end_datetime,
          end_location: item.end_latitude + ":" + item.end_longitude,
          max_speed: item.max_speed,
          avg_speed: item.avg_speed,
          distance: item.distance,
          duration: item.duration,
        }));
        setKeyOnOffList(processedData);
      } else {
        setKeyOnOffList([]);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };
  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(tableColumns)
      .addDataSource(KeyOnOffList, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <Card title="KeyOnKeyOff Report">
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
                name="vehicle_id"
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
                      {vehicle.vehicle_name + " - " + vehicle.device_imei}
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
            <div className="mb-3">
              <Button
                type="primary"
                icon={<FileExcelOutlined />}
                onClick={handleClick}
              >
                Export
              </Button>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          {isLoading ? (
            <div>Loading...</div> // Display loading indicator
          ) : KeyOnOffList.length > 0 ? (
            <Table bordered columns={tableColumns} dataSource={KeyOnOffList} />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default KeyOnKeyOffReport;
