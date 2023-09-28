import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Form,
  Row,
  Col,
  Space,
  notification,
} from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";

const { Option } = Select;

const Create = (props) => {
  const [form] = Form.useForm();

  const [selectedSupplierId, setselectedSupplierId] = useState();
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [selectedMakeId, setselectedMakeId] = useState();
  const [makeOptions, setMakeOptions] = useState([]);
  const [selectedModelId, setselectedModelId] = useState();
  const [modelOptions, setModelOptions] = useState([]);

  const handleSupplierIdChange = (sid) => {
    setselectedSupplierId(sid);
  };
  const handleMakeIdChange = (makeid) => {
    setselectedMakeId(makeid);
    fetchModelOptions(setModelOptions);
    async function fetchModelOptions(setModelOptions) {
      try {
        const data = { make_id: makeid };
        const response = await api.post("model_list", data);
        if (response.data.success) {
          setModelOptions(response.data.data);
        } else {
          console.error("API request was not successful");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
  };

  const handleModelIdChange = (modelid) => {
    setselectedModelId(modelid);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    fetchSupplierOptions(setSupplierOptions);
    fetchMakeOptions(setMakeOptions);
  }, []);

  const onFinish = async (values) => {
    const data = {
      supplier_id: values.supplier_id,
      device_make_id: values.device_make_id,
      device_model_id: values.device_model_id,
      device_imei_no: values.device_imei_no,
      uid: values.uid,
      ccid: values.ccid,
      description: values.description,
    };

    try {
      await api.post("device/store", data);
      form.resetFields();
      props.parentFunction();
      openNotification("success", "Device", "Device Inserted Successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("device_imei_no")) {
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

  // Define the functions outside the component
  async function fetchSupplierOptions(setSupplierOptions) {
    try {
      const response = await api.get("supplier");
      if (response.data.success) {
        setSupplierOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  async function fetchMakeOptions(setMakeOptions) {
    try {
      const response = await api.get("device_make");
      if (response.data.success) {
        setMakeOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
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
            label="Supplier"
            name="supplier_id"
            rules={[
              {
                required: true,
                message: "Please Select a Supplier",
              },
            ]}
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
              {Array.isArray(supplierOptions) ? (
                supplierOptions.map((supplier) => (
                  <Option key={supplier.id} value={supplier.id}>
                    {supplier.supplier_name}
                  </Option>
                ))
              ) : (
                <Option value="Loading" disabled>
                  Loading...
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device Make"
            name="device_make_id"
            rules={[
              {
                required: true,
                message: "Please Select a Device Make",
              },
            ]}
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
              {Array.isArray(makeOptions) ? (
                makeOptions.map((make) => (
                  <Option key={make.id} value={make.id}>
                    {make.device_make}
                  </Option>
                ))
              ) : (
                <Option value="Loading" disabled>
                  Loading...
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device Model"
            name="device_model_id"
            rules={[
              {
                required: true,
                message: "Please Select a Device Model",
              },
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
              {Array.isArray(modelOptions) ? (
                modelOptions.map((model) => (
                  <Option key={model.id} value={model.id}>
                    {model.device_model}
                  </Option>
                ))
              ) : (
                <Option value="Loading" disabled>
                  Loading...
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>

        <Col sm={12} md={12} lg={12}>
          <Form.Item
            size="small"
            label="Device IMEI No"
            name="device_imei_no"
            rules={[
              {
                required: true,
                message: "Please enter a Device IMEI No",
              },
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
      <Row align={"middle"}>
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
export default Create;
