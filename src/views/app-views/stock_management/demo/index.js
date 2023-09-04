import React, { useState, useEffect } from "react";
import { Row, Col, Card, Select, Form, Button } from "antd";
import api from "configs/apiConfig";
import Input from "antd/es/input/Input";
const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );

  const getUserList = async () => {
    const user_data = { user_id: currentUser };
    const vehicle_data = await api
      .post("role_based_user_list", user_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });

    // Super Admin
    if (currentRole == 1) {
      console.log("Super Admin");
      SetAdminList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 2) {
      console.log("Admin");
      SetDistributorList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 3) {
      console.log("Distributor");
      SetDealerList(vehicle_data?.data?.data?.user_list);
    }
    if (currentRole == 4) {
      console.log("Dealer");
      SetSubdealerList(vehicle_data?.data?.data?.subdealer_list);
    }
  };
  const user = () => {
    return localStorage.getItem("id");
  };
  const role = () => {
    return localStorage.getItem("role");
  };

  // on change Admin
  const AdminChange = async (value) => {
    form.setFieldValue("");
    SetDistributorList([]);
    SetDealerList([]);
    SetSubdealerList([]);
    const user_get_data = { user_id: value };
    const distributor_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetDistributorList(distributor_list?.data?.data?.user_list);
  };
  // On change Distributor
  const DistributorChange = async (value) => {
    form.setFieldValue("");
    SetDealerList("");
    SetSubdealerList("");
    const user_get_data = { user_id: value };
    const dealer_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetDealerList(dealer_list?.data?.data?.user_list);
  };
  // on change Dealer
  const DealerChange = async (value) => {
    form.setFieldValue("");
    SetSubdealerList([]);

    const user_get_data = { user_id: value };
    const subdealer_list = await api
      .post("role_based_user_list", user_get_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetSubdealerList(subdealer_list?.data?.data?.subdealer_list);
  };

  useEffect(() => {
    SetCurrentUser(user());
    SetCurrentRole(role());
    getUserList();
  }, []);

  const onFinish = async (values) => {
    console.log(values["type"]);
    if (values["type"] == "Sim") {
      console.log(values["type"]);
      const form_data = await api
        .post("sim_transfer", values)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });
    } else if (values["type"] == "Device") {
      console.log(values["type"]);
      const form_data = await api
        .post("device_transfer", values)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });
    }
  };

  const newLocal = (
    <Card>
      <Form layout="vertical" size="small" onFinish={onFinish}>
        <Row gutter={[8, 8]}>
          <Form.Item size="small" type="text" name="id" initialValue={1}>
            <Input style={{ display: "none" }}></Input>
          </Form.Item>
          <Form.Item size="small" type="text" name="type" initialValue={"Sim"}>
            <Input style={{ border: "none" }} readOnly size="big"></Input>
          </Form.Item>
        </Row>
        <Form.Item label="IMEI No" type="text">
          <Input readOnly></Input>
        </Form.Item>

        {currentRole == 1 && (
          <Form.Item label="Admin" name="admin_id">
            <Select onChange={AdminChange}>
              {Array.isArray(adminList) ? (
                adminList.map((admin) => (
                  <Select.Option key={admin?.id} role_id="2" value={admin?.id}>
                    {admin?.name}
                  </Select.Option>
                ))
              ) : (
                <Select.Option role_id="2" value=""></Select.Option>
              )}
            </Select>
          </Form.Item>
        )}
        {(currentRole == 1 || currentRole == 2) && (
          <Form.Item label="Distributor" name="distributor_id">
            <Select onChange={DistributorChange}>
              {Array.isArray(distributorList) ? (
                distributorList.map((distributor) => (
                  <Option
                    key={distributor?.id}
                    role_id="3"
                    value={distributor?.id}
                  >
                    {distributor?.name}
                  </Option>
                ))
              ) : (
                <Option role_id="3" value=""></Option>
              )}
            </Select>
          </Form.Item>
        )}
        {(currentRole == 1 || currentRole == 2 || currentRole == 3) && (
          <Form.Item label="Dealer" name="dealer_id">
            <Select onChange={DealerChange}>
              {Array.isArray(dealerList) ? (
                dealerList.map((dealer) => (
                  <Option key={dealer?.id} role_id="4" value={dealer?.id}>
                    {dealer?.name}
                  </Option>
                ))
              ) : (
                <Option role_id="4" value=""></Option>
              )}
            </Select>
          </Form.Item>
        )}
        {(currentRole == 1 ||
          currentRole == 2 ||
          currentRole == 3 ||
          currentRole == 4) && (
          <Form.Item label="Subdealer" name="subdealer_id">
            <Select>
              {Array.isArray(subdealerList) && subdealerList.length > 0 ? (
                subdealerList.map((subdealer) => (
                  <Option key={subdealer?.id} role_id="5" value={subdealer?.id}>
                    {subdealer?.name}
                  </Option>
                ))
              ) : (
                <Option></Option>
              )}
            </Select>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </Card>
  );

  return (
    <>
      <Row gutter={6}>
        <Col xs={24} sm={24} xl={4} md={4} lg={4} xxl={4}>
          {newLocal}
        </Col>
      </Row>
    </>
  );
};

export default Report;
