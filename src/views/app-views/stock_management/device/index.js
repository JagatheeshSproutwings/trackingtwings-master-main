import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import Create from "./create";
import Edit from "./edit";

export const Device = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editdata, setEditData] = useState("");

  const handleCreateCard = () => {
    setIsCreateVisible(true);
    setIsEditVisible(false);
  };
  const handleEditCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(true);
  };

  async function loadDevices(setDeviceList) {
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
        }));
        setDeviceList(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleEditClick(record) {
    handleEditCard();

    const id = record.id;
    const supplier_id = record.supplier_id;
    const supplier_name = record.supplier_name;
    const device_make_id = record.device_make_id;
    const device_model_id = record.device_model_id;
    const device_make = record.device_make;
    const device_model = record.device_model;
    const device_imei_no = record.device_imei_no;
    const ccid = record.ccid;
    const uid = record.uid;

    const data = [
      id,
      supplier_id,
      supplier_name,
      device_make_id,
      device_make,
      device_model_id,
      device_model,
      device_imei_no,
      ccid,
      uid,
    ];

    setEditData(data);
  }

  useEffect(() => {
    loadDevices(setDeviceList);
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
      render: (_, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleEditClick(record)}
        >
          <EditOutlined />
        </span>
      ),
    },
  ];

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value;
  //   const searchArray = e.currentTarget.value ? deviceList : OrderListData;
  //   const data = utils.wildCardSearch(searchArray, value);
  //   setDeviceList(data);
  //   setSelectedRowKeys([]);
  // };

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRowKeys(key);
    },
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
                    // onChange={(e) => onSearch(e)}
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
                rowSelection={{
                  selectedRowKeys: selectedRowKeys,
                  type: "checkbox",
                  preserveSelectedRowKeys: false,
                  ...rowSelection,
                }}
              />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={10} lg={10}>
          {isCreateVisible && <Create />}
          {isEditVisible && <Edit parentToChild={editdata} />}
        </Col>
      </Row>
    </>
  );
};
export default Device;
