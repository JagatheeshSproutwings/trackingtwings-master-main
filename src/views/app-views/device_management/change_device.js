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

const { Option } = Select;

const ChangeDevice = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [selectedSupplierId, setSelectedSupplierId] = useState();
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState();
  const [makeOptions, setMakeOptions] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const openNotification = (type, message, description) => {
    notification[type]({ message, description });
  };

  useEffect(() => {
    fetchOptions("supplier", setSupplierOptions);
    fetchOptions("device_make", setMakeOptions);
  }, []);

  const fetchOptions = async (endpoint, setter) => {
    try {
      const response = await api.get(endpoint);
      if (response.data.success) {
        setter(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const handleSupplierIdChange = (sid) => {
    setSelectedSupplierId(sid);
  };

  const handleMakeIdChange = async (makeid) => {
    setSelectedMakeId(makeid);
    try {
      const data = { make_id: makeid };
      const response = await api.post("model_list", data);
      if (response.data.success) {
        setModelOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleModelIdChange = (modelid) => {
    setSelectedModelId(modelid);
  };

  const onFinish = async (values) => {
    alert(parentToChild["id"]);

    values["id"] = parentToChild["id"];
    try {
      console.log(values);
      await api.post("change_device", values);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Device", "Device Inserted Successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.device_imei_no) {
            openNotification(
              "info",
              "Device IMEI No",
              "Device IMEI No is Already Exists"
            );
          }
        }
      }
    }
  };

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
            label="Supplier"
            name="supplier_id"
            rules={[{ required: true, message: "Please Select a Supplier" }]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              placeholder="Select Supplier"
              onChange={handleSupplierIdChange}
              value={selectedSupplierId}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {supplierOptions.map((supplier) => (
                <Option key={supplier.id} value={supplier.id}>
                  {supplier.supplier_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device Make"
            name="device_make_id"
            rules={[{ required: true, message: "Please Select a Device Make" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select Device Make"
              optionFilterProp="children"
              onChange={handleMakeIdChange}
              value={selectedMakeId}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {makeOptions.map((make) => (
                <Option key={make.id} value={make.id}>
                  {make.device_make}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device Model"
            name="device_model_id"
            rules={[
              { required: true, message: "Please Select a Device Model" },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select Device Model"
              optionFilterProp="children"
              onChange={handleModelIdChange}
              value={selectedModelId}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {modelOptions.map((model) => (
                <Option key={model.id} value={model.id}>
                  {model.device_model}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device IMEI No"
            name="device_imei_no"
            rules={[
              { required: true, message: "Please enter a Device IMEI No" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Form.Item size="small" label="Device UID" name="uid">
            <Input />
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item size="small" label="Device CCID" name="ccid">
            <Input />
          </Form.Item>
        </Col>

        <Col sm={24} md={24} lg={24}>
          <Form.Item size="small" label="Device Description" name="description">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={12}>
          <Form.Item>
            <Space wrap>
              <Button type="primary" shape="round" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangeDevice;
