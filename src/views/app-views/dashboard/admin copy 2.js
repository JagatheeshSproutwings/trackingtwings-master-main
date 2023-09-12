import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Select } from "antd";
import { LayersControl } from "react-leaflet";
import { useSelector } from "react-redux";

import api from "configs/apiConfig";
export const Admin = () => {
  const [CustomerId, SetCustomerId] = useState("");
  const [UserDetail, SetUserDetail] = useState({});
  const [VehicleDetail, SetVehicleDetail] = useState("");
  const token = useSelector((state) => state.auth);
  console.log(token);

  useEffect(() => {
    vehicle_list();
  }, []);

  const getRole = () => {
    return localStorage.getItem("role");
  };

  const role = getRole();

  const getUser = () => {
    return localStorage.getItem("id");
  };

  const user = getUser();

  const vehicle_list = async () => {
    try {
      if (role == 6) {
        const vehicle_data = await api.get("vehicle_count");
        console.log(vehicle_data.data);
        SetVehicleDetail(vehicle_data.data);
      } else {
        const data = { user_id: user };
        const vehicle_data = await api.post("role_based_vehicle_count", data);
        console.log(vehicle_data.data);
        SetVehicleDetail(vehicle_data.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Row gutter={16} style={{ padding: 0, margin: 0 }}>
        <Col span={4} style={{ padding: 0, margin: 0 }}>
          <Card
            title="All"
            size="small"
            headStyle={{ backgroundColor: "#5c6cfa", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.total_vehicles}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Idle"
            size="small"
            headStyle={{ backgroundColor: "#FF864A", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.idle}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Moving"
            size="small"
            headStyle={{ backgroundColor: "#11A578", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.running}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Parking"
            size="small"
            headStyle={{ backgroundColor: "#13b3c2", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.stop}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="Inactive"
            size="small"
            headStyle={{ backgroundColor: "#fc3158", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.no_data}
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title="No Data"
            size="small"
            headStyle={{ backgroundColor: "#a1a108", color: "#ffffff" }}
            bodyStyle={{ backgroundColor: "#c2c2be", color: "#ffffff" }}
            bordered={false}
            align="center"
          >
            {VehicleDetail?.data?.inactive}
          </Card>
        </Col>
      </Row>
      
      {/* <Row>
        <Col span={24}>
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
      </Row> */}
    </>
  );
};

export default Admin;
