import React, { useState, useEffect } from "react";
import { Table, Row, Col, List, Avatar, Badge, Skeleton } from "antd";
import { CarFilled, WifiOutlined } from "@ant-design/icons";
import BatteryGauge from "react-battery-gauge";
import {
  BLUE_BASE,
  GOLD_BASE,
  GRAY_DARK,
  GREEN_BASE,
} from "constants/ThemeConstant";
import { size } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import "assets/styles/multi_dashboard.css";

// Api call
import api from "configs/apiConfig";

const data = [
  {
    id: 1,
    title: "TN01AN1245",
    description: "2023-08-02 01:00:00",
    color: GREEN_BASE,
    speed: "30KMPH",
    gps_count: 10,
    gsm_count: 5,
  },
  {
    id: 2,
    title: "TN07DX8989",
    description: "2023-08-02 02:00:00",
    color: GRAY_DARK,
    speed: "50KMPH",
    gps_count: 20,
    gsm_count: 15,
  },
  {
    id: 3,
    title: "AP02DC4565",
    description: "2023-08-02 03:00:00",
    color: BLUE_BASE,
    speed: "80KMPH",
    gps_count: 5,
    gsm_count: 20,
  },
  {
    id: 4,
    title: "TN04DC8989",
    description: "2023-08-02 04:00:00",
    color: GOLD_BASE,
    speed: "60KMPH",
    gps_count: 10,
    gsm_count: 20,
  },
  {
    id: 5,
    title: "TN01AN1245",
    description: "2023-08-02 01:00:00",
    color: GREEN_BASE,
    speed: "65KMPH",
    gps_count: 20,
    gsm_count: 15,
  },
  {
    id: 6,
    title: "TN07DX8989",
    description: "2023-08-02 02:00:00",
    color: GRAY_DARK,
    speed: "72KMPH",
    gps_count: 30,
    gsm_count: 24,
  },
  {
    id: 7,
    title: "AP02DC4565",
    description: "2023-08-02 03:00:00",
    color: BLUE_BASE,
    speed: "40KMPH",
    gps_count: 30,
    gsm_count: 62,
  },
  {
    id: 8,
    title: "TN04DC8989",
    description: "2023-08-02 04:00:00",
    color: GOLD_BASE,
    speed: "80KMPH",
    gps_count: 40,
    gsm_count: 55,
  },
  {
    id: 9,
    title: "TN07DX8989",
    description: "2023-08-02 02:00:00",
    color: GRAY_DARK,
    speed: "55KMPH",
    gps_count: 20,
    gsm_count: 15,
  },
  {
    id: 10,
    title: "AP02DC4565",
    description: "2023-08-02 03:00:00",
    color: BLUE_BASE,
    speed: "12KMPH",
    gps_count: 20,
    gsm_count: 15,
  },
  {
    id: 11,
    title: "TN04DC8989",
    description: "2023-08-02 04:00:00",
    color: GOLD_BASE,
    speed: "100KMPH",
    gps_count: 20,
    gsm_count: 15,
  },
];

const AllVehicles = () => {
  useEffect(() => {
    vehicle_list();
  }, []);
  const vehicle_list = async (values) => {
    const user_data = await api.get("multi_dashboard");
    console.log(user_data.data);
    // SetUserDetail(user_data.data.data);
    // SetCustomerId(user_data.data.message);
  };
  return (
    <div style={{ padding: 0, margin: 1 }}>
      <List
        style={{ padding: 0, margin: 1, fontSize: "10px", border: "1px" }}
        itemLayout="horizontal"
        size="small"
        dataSource={data}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-more">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  style={{ fontSize: "15px", padding: "0", color: GREEN_BASE }}
                />
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  style={{ backgroundColor: "transparent" }}
                  icon={
                    <CarFilled
                      style={{
                        fontSize: "15px",
                        padding: "0",
                        color: item.color,
                      }}
                    />
                  }
                />
              }
              title={<span style={{ fontSize: "12px" }}>{item.title}</span>}
              description={
                <span style={{ fontSize: "10px" }}>{item.description}</span>
              }
            />
            <Row style={{ padding: 0 }}>
              <Col className="ml-15">
                <h6>{item.speed}</h6>
              </Col>
              <Col className="ml-2">
                <WifiOutlined style={{ fontSize: "15px", color: GREEN_BASE }} />
              </Col>
              <Col className="ml-2">
                <FontAwesomeIcon
                  icon={faLocationCrosshairs}
                  style={{ fontSize: "15px", color: GREEN_BASE }}
                />
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AllVehicles;
