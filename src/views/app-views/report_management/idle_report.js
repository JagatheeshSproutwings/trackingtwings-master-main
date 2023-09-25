import React, { useState, useEffect } from "react";
import { Card, Table, Button, Select, DatePicker } from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Idlereport = ({ parentToChild, ...props }) => {
  const [idleList, setIdleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("All");
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const tableColumns = [
    {
      title: "S.No",
      dataIndex: "s_no",
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicle_name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
    },
    {
      title: "Location",
      dataIndex: "location",
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
      device_imei: selectedVehicleId === "0" ? null : selectedVehicleId,
    };

    setIdleList([]); // Clear previous data
    setIsLoading(true);

    try {
      const idle_data = await api.post("get_idle_report", data);

      if (idle_data.data && Array.isArray(idle_data.data.data)) {
        const processedData = idle_data.data.data.map((item) => ({
          s_no: item.id,
          vehicle_name: item.vehicle_name,
          start_date: item.start_datetime,
          end_date: item.end_datetime,
          location: item.start_latitude + ":" + item.start_longitude,
          duration: item.idle_duration,
        }));
        setIdleList(processedData);
      } else {
        setIdleList([]);
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
      .addDataSource(idleList, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <Card title="Idle Report">
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
          ) : idleList.length > 0 ? (
            <Table bordered columns={tableColumns} dataSource={idleList} />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Idlereport;
