import React, { useState, useEffect } from "react";
import { Col, Select, Form, Button, notification } from "antd";
import api from "configs/apiConfig";
const { Option } = Select;

const Assign = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const [adminList, SetAdminList] = useState([]);
  const [distributorList, SetDistributorList] = useState([]);
  const [dealerList, SetDealerList] = useState([]);
  const [subdealerList, SetSubdealerList] = useState([]);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const [currentUser, SetCurrentUser] = useState(
    localStorage.getItem("id") || ""
  );
  const [currentRole, SetCurrentRole] = useState(
    localStorage.getItem("role") || ""
  );
  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

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
    if (parentToChild[1] == "Sim") {
      values["id"] = parentToChild[0];
      await api.post("sim_transfer", values);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Device", "Sim Transfered Successfully!");

      toggleComponentVisibility();
    } else if (parentToChild[1] == "Device") {
      values["id"] = parentToChild[0];
      await api.post("device_transfer", values);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Device", "Device Transfered Successfully!");

      toggleComponentVisibility();
    }
  };

  return (
    <Form layout="vertical" size="small" onFinish={onFinish}>
      <Col sm={12} md={12} lg={12}>
        {currentRole == 1 && (
          <Form.Item label="Admin" name="admin_id">
            <Select
              onChange={AdminChange}
              allowClear
              showSearch
              optionFilterProp="children"
            >
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
      </Col>
      <Col sm={12} md={12} lg={12}>
        {(currentRole == 1 || currentRole == 2) && (
          <Form.Item label="Distributor" name="distributor_id">
            <Select
              onChange={DistributorChange}
              allowClear
              showSearch
              optionFilterProp="children"
            >
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
      </Col>
      <Col sm={12} md={12} lg={12}>
        {(currentRole == 1 || currentRole == 2 || currentRole == 3) && (
          <Form.Item label="Dealer" name="dealer_id">
            <Select
              onChange={DealerChange}
              allowClear
              showSearch
              optionFilterProp="children"
            >
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
      </Col>
      <Col sm={12} md={12} lg={12}>
        {(currentRole == 1 ||
          currentRole == 2 ||
          currentRole == 3 ||
          currentRole == 4) && (
          <Form.Item label="Subdealer" name="subdealer_id">
            <Select allowClear showSearch optionFilterProp="children">
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
      </Col>
      <Button type="primary" htmlType="submit">
        Assign
      </Button>
    </Form>
  );
};

export default Assign;
