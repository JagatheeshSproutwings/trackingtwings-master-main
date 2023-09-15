import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import Create from "./create";
import Edit from "./edit";
import Assign from "../demo/index";
import utils from "utils";

export const Device = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [maindeviceList, setMainDeviceList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAssignVisible, setIsAssignVisible] = useState(false);

  const [editdata, setEditData] = useState("");
  const [assigndata, setAssignData] = useState("");

  const handleCreateCard = () => {
    setIsCreateVisible(true);
    setIsEditVisible(false);
    setIsAssignVisible(false);
  };
  const handleEditCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(true);
  };
  const handleAssignCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(false);
    setIsAssignVisible(true);
  };

  const parentFunction = () => {
    setIsEditVisible(false);
    loadDevices();
  };

  const loadDevices = async () => {
    try {
      const response = await api.post("device_list");

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          id: item.id,
          supplier_id: item.supplier_id,
          supplier_name: item.supplier_name,
          device_imei_no: item.device_imei_no,
          ccid: item.ccid,
          uid: item.uid,
          device_make_id: item.device_make_id,
          device_model_id: item.device_model_id,
          device_make: item.device_make,
          device_model: item.device_model,
          description: item.description,
        }));
        setDeviceList(processedData);
        setMainDeviceList(processedData);
      } else {
        setDeviceList("");
        setMainDeviceList("");
        console.error("API request was not successful");
      }
    } catch (error) {
      setDeviceList("");
      setMainDeviceList("");
      console.error("Error fetching users:", error);
    }
  };

  function handleEditClick(record) {
    setEditData([
      record.id,
      record.supplier_id,
      record.supplier_name,
      record.device_make_id,
      record.device_make,
      record.device_model_id,
      record.device_model,
      record.device_imei_no,
      record.ccid,
      record.uid,
      record.description,
    ]);

    // Set isEditVisible to true
    setIsEditVisible(true);
    setIsCreateVisible(false);
    setIsAssignVisible(false);
  }

  function handleAssignClick(record) {
    handleAssignCard();

    const id = record.id;
    const type = "Device";
    const device_imei_no = record.device_imei_no;

    const data = [id, type, device_imei_no];

    setAssignData(data);
  }

  useEffect(() => {
    loadDevices();
  }, []);

  const tableColumns = [
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
    },
    {
      title: "Device No",
      dataIndex: "device_imei_no",
    },
    {
      title: "Device Make",
      dataIndex: "device_make",
    },
    {
      title: "Device Model",
      dataIndex: "device_model",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      fixed: "right",
      render: (_, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleEditClick(record)}
        >
          <EditOutlined />
        </span>
      ),
    },
    {
      title: "Assign",
      dataIndex: "edit",
      fixed: "right",
      render: (_, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleAssignClick(record)} // Replace handleEditClick with your custom action function
        >
          <EditOutlined /> {/* Replace EditOutlined with your custom icon */}
        </span>
      ),
    },
  ];

  const onSearch = (e) => {
    const searchValue = e.currentTarget.value;
    const searchArray = searchValue ? deviceList : maindeviceList; // Use a different source if needed
    const filteredUserList = utils.wildCardSearch(searchArray, searchValue);
    setDeviceList(filteredUserList);
    setSelectedRowKeys([]);
  };

  return (
    <>
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
          <Card title="Device">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mobileFlex={false}
            >
              <Flex className="mb-1" mobileFlex={false}>
                <div className="mr-md-3 mb-3">
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                  />
                </div>

                <div className="mb-3"></div>
              </Flex>
              <div className="mb-3">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  ghost
                  onClick={handleCreateCard}
                >
                  Add Device
                </Button>
              </div>
            </Flex>
            <div className="table-responsive">
              <Table
                bordered
                columns={tableColumns}
                dataSource={deviceList}
                rowKey="id"
              />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={10} lg={10}>
          {isCreateVisible && <Create parentFunction={parentFunction} />}
          {isAssignVisible && (
            <Assign
              key={assigndata[0]}
              parentToChild={assigndata}
              parentFunction={parentFunction}
            />
          )}
          {isEditVisible && (
            <Edit
              key={editdata[0]}
              parentToChild={editdata}
              parentFunction={parentFunction}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
export default Device;
