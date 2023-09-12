import React, { useState, useEffect } from "react";
import { Table, Button, Card, Select, DatePicker } from "antd";
import Flex from "components/shared-components/Flex";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import api from "configs/apiConfig";
import { Excel } from "antd-table-saveas-excel";

const { Option } = Select;
const { RangePicker } = DatePicker;

export const ParkingReport = () => {
  const [parkingList, setParkingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("All");
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    async function fetchVehicleOptions() {
      try {
        const response = await api.post("vehicle_list");
        if (response.data.success) {
          setVehicleOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } catch (error) {
        console.error("Error fetching vehicle options:", error);
      }
    }

    fetchVehicleOptions();
  }, []);

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleVehicleIdChange = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleSearchClick = async () => {
    // Log the actual selected values
    console.log("Selected Date Range:", selectedDateRange);
    if (selectedDateRange) {
      const [startDate, endDate] = selectedDateRange;
      console.log("Start Date:", startDate.format("YYYY-MM-DD"));
      console.log("End Date:", endDate.format("YYYY-MM-DD"));
    }
    console.log("Selected Vehicle ID:", selectedVehicleId);

    const data = {
      start_day: selectedDateRange
        ? selectedDateRange[0].format("YYYY-MM-DD HH:mm:ss")
        : null,
      end_day: selectedDateRange
        ? selectedDateRange[1].format("YYYY-MM-DD HH:mm:ss")
        : null,
      device_imei: selectedVehicleId === "0" ? null : selectedVehicleId,
    };

    setParkingList([]); // Clear previous data
    setIsLoading(true);

    try {
      const parking_data = await api.post("get_parking_report", data);
      console.log(parking_data.data);

      if (parking_data.data && Array.isArray(parking_data.data.data)) {
        const processedData = parking_data.data.data.map((item) => ({
          s_no: item.id,
          vehicle_name: item.vehicle_name,
          start_date: item.start_datetime,
          end_date: item.end_datetime,
          location: item.start_latitude + ":" + item.start_longitude,
          duration: item.parking_duration,
        }));

        console.log(processedData);

        setParkingList(processedData);

        console.log("parkingList:", parkingList);
      } else {
        setParkingList([]); // Clear the list when no data is found
        console.log(
          "Response data is not in the expected format:",
          parking_data.data
        );
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);

    // Perform additional actions based on the selected values
  };

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

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(tableColumns)
      .addDataSource(parkingList, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <>
      <Card title="Parking Report">
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
            <div className="mb-3">
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
          ) : parkingList.length > 0 ? (
            <Table bordered columns={tableColumns} dataSource={parkingList} />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default ParkingReport;
