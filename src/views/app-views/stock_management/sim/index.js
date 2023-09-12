import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row, Col, Input } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";

import api from "configs/apiConfig";
import Create from "./create";
import Edit from "./edit";
import Assign from "../demo/index";

export const Sim = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const [simList, setSimList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
    setIsAssignVisible(false);
  };
  const handleAssignCard = () => {
    setIsCreateVisible(false);
    setIsEditVisible(false);
    setIsAssignVisible(true);
  };
  const parentFunction = () => {
    console.log(simList);
    loadSims();
  };

  const loadSims = async () => {
    try {
      const response = await api.post("sim_list");

      if (response.data && Array.isArray(response.data.data)) {
        const processedData = response.data.data.map((item) => ({
          id: item.id,
          network_id: item.network_id,
          network_provider_name: item.network_provider_name,
          sim_imei_no: item.sim_imei_no,
          sim_mob_no1: item.sim_mob_no1,
          sim_mob_no2: item.sim_mob_no2,
          valid_from: item.valid_from,
          valid_to: item.valid_to,
        }));
        setSimList(processedData);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function handleEditClick(record) {
    setEditData([
      record.id,
      record.network_id,
      record.network_provider_name,
      record.sim_imei_no,
      record.sim_mob_no1,
      record.sim_mob_no2,
      record.valid_form,
      record.valid_to,
    ]);

    // Set isEditVisible to true
    setIsEditVisible(true);
    setIsCreateVisible(false);
    setIsAssignVisible(false);
  }

  function handleAssignClick(record) {
    handleAssignCard();

    const id = record.id;
    const type = "Sim";
    const sim_imei_no = record.sim_imei_no;

    const data = [id, type, sim_imei_no];

    setAssignData(data);
  }

  useEffect(() => {
    loadSims(setSimList);
  }, []);

  const tableColumns = [
    {
      title: "Network",
      dataIndex: "network_provider_name",
    },
    {
      title: "Sim IMEI No",
      dataIndex: "sim_imei_no",
    },
    {
      title: "Sim Mobile Number",
      dataIndex: "sim_mob_no1",
    },
    {
      title: "Sim Mobile Number",
      dataIndex: "sim_mob_no2",
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
    {
      title: "Assign",
      dataIndex: "edit",
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
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? simList : [];
    const data = utils.wildCardSearch(searchArray, value);
    setSimList(data);
    setSelectedRowKeys([]);
  };
  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  return (
    <>
      <Row gutter={6}>
        <Col sm={24} md={14} lg={14}>
          <Card title="Sim">
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
                  Add Sim
                </Button>
              </div>
            </Flex>
            <div className="table-responsive">
              <Table
                bordered
                columns={tableColumns}
                dataSource={simList}
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
export default Sim;
