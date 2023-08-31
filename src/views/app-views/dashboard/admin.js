import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Table,
  Select,
  Input,
  Badge,
  Avatar,
  Divider,
  Button,
  List,
  Space,
} from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { WHITE } from "constants/ThemeConstant";
import { useSelector } from "react-redux";
import api from "configs/apiConfig";
import { CarOutlined } from "@ant-design/icons";
const { Option } = Select;
export const Admin = () => {
  const [CustomerId, SetCustomerId] = useState("");
  const [UserDetail, SetUserDetail] = useState({});
  const [VehicleDetail, SetVehicleDetail] = useState("");
  const token = useSelector((state) => state.auth);
  console.log(token);
  const position = [11.0467, 76.9254];
  const { BaseLayer } = LayersControl;
  const tableColumns = [
    {
      title: "Vehicle No.",
      dataIndex: "vehicle_no",
      key: "vehicle_no",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const handleChange = (values) => {
    console.log(values);
    user_list(values);
  };

  useEffect(() => {
    vehicle_list();
  }, []);

  const vehicle_list = async () => {
    const vehicle_data = await api.get("vehicle_count");
    console.log(vehicle_data.data);
    SetVehicleDetail(vehicle_data.data);
    // SetCustomerId(user_data.data.message);
  };
  const user_list = async (values) => {
    const user_data = await api.get("user/show/" + values);
    console.log(user_data.data);
    SetUserDetail(user_data.data.data);
    SetCustomerId(user_data.data.message);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={4}>
          <Card title="All" size="small" bordered={false}>
            {VehicleDetail?.data?.total_vehicles}
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Idle" size="small" bordered={false}>
            {VehicleDetail?.data?.idle}
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Moving" size="small" bordered={false}>
            {VehicleDetail?.data?.running}
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Parking" size="small" bordered={false}>
            {VehicleDetail?.data?.stop}
          </Card>
        </Col>
        <Col span={4}>
          <Card title="No Network" size="small" bordered={false}>
            {VehicleDetail?.data?.no_data}
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Expired" size="small" bordered={false}>
            {VehicleDetail?.data?.expired_vehicles}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <LayersControl>
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </BaseLayer>
              <BaseLayer name="Google-Street View">
                <TileLayer
                  attribution="Google Maps"
                  url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                />
              </BaseLayer>
              <BaseLayer checked name="Google-Satelite">
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt1", "mt2", "mt3"]}
                />
              </BaseLayer>
            </LayersControl>
          </MapContainer>
        </Col>
        <Col span={6}>
          <h2>Charts</h2>
        </Col>
      </Row>
    </>
  );
};

export default Admin;
