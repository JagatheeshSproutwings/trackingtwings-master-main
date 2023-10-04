import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Input,
  Form,
  Row,
  Col,
  Space,
  notification,
} from "antd";
import api from "configs/apiConfig";
import { GREEN_BASE } from "constants/ThemeConstant";

const { Option } = Select;

const Edit = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();

  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [countryOptions, setCountryOptions] = useState([]);

  const handleCountryIdChange = (countryId) => {
    setSelectedCountryId(countryId);
  };
  useEffect(() => {
    fetchCountryOptions(setCountryOptions);
  }, []);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onFinish = async (values) => {
    try {
      await api.post("user/update", values);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "User", "User Updated Successfully!");
      toggleComponentVisibility();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("email")) {
            openNotification(
              "info",
              "E-Mail ID",
              "Given E-Mail ID is Already Exists"
            );
          }
        }
      }
    }
  };

  async function fetchCountryOptions(setCountryOptions) {
    try {
      const response = await api.get("country");
      if (response.data.success) {
        setCountryOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  return (
    <Form
      form={form}
      size="small"
      name="registrationForm"
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[8, 8]}>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="User Name"
            name="name"
            initialValue={parentToChild[1]}
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="E-Mail ID"
            name="email"
            initialValue={parentToChild[2]}
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Mobile No"
            name="mobile_no"
            initialValue={parentToChild[3]}
            rules={[
              {
                required: true,
                message: "Please enter your mobile no",
              },
              {
                type: "text",
                message: "Please enter a valid mobile no",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Country"
            name="country_id"
            initialValue={parentToChild[7]}
            rules={[
              {
                required: true,
                message: "Please Select a Country",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              onChange={handleCountryIdChange}
              value={selectedCountryId}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {Array.isArray(countryOptions) ? (
                countryOptions.map((country) => (
                  <Option key={country.id} value={country.id}>
                    {country.country_name}
                  </Option>
                ))
              ) : (
                <Option value="Loading">Loading...</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row align={"middle"}>
        <Col sm={12} md={12} lg={12}>
          <Form.Item hidden name="id" initialValue={parentToChild[0]}>
            <Input></Input>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item hidden name="role_id" initialValue={parentToChild[5]}>
            <Input></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row align={"right"}>
        <Col span={12}>
          <Form.Item>
            <Space wrap>
              <Button
                type="primary"
                style={{ backgroundColor: GREEN_BASE }}
                success
                shape="round"
                htmlType="submit"
              >
                Update
              </Button>
              <Button type="primary" shape="round">
                Back
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Edit;
