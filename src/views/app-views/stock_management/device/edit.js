import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  Input,
  Alert,
  Form,
  Row,
  Col,
  Space,
  DatePicker,
} from "antd";
import Flex from "components/shared-components/Flex";
import api from "configs/apiConfig";
import moment from "moment";

const { Option } = Select;

export default function Edit({ parentToChild }) {
  const [selectedSupplierId, setselectedSupplierId] = useState();
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [selectedMakeId, setselectedMakeId] = useState();
  const [makeOptions, setMakeOptions] = useState([]);
  const [selectedModelId, setselectedModelId] = useState();
  const [modelOptions, setModelOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSupplierIdChange = (roleID) => {
    setselectedSupplierId(roleID);
  };
  const handleMakeIdChange = (roleID) => {
    setselectedMakeId(roleID);
  };

  const handleModelIdChange = (roleID) => {
    setselectedModelId(roleID);
  };

  useEffect(() => {
    fetchSupplierOptions(setSupplierOptions);
    fetchMakeOptions(setMakeOptions);
    fetchModelOptions(setModelOptions);
  }, []);

  const onFinish = async (values) => {
    document.getElementById("imei_er_span").textContent = "";

    const data = {
      id: parentToChild[0],
      supplier_id: values.supplier_id,
      device_make_id: values.device_make_id,
      device_model_id: values.device_model_id,
      device_imei_no: values.device_imei_no,
      uid: values.uid,
      ccid: values.ccid,
    };

    try {
      await api.post("device/update", data);
      setIsSubmitted(true);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
        if (errorData.message && typeof errorData.message === "object") {
          const validationErrors = errorData.message;
          if (validationErrors.hasOwnProperty("device_imei_no")) {
            console.log(validationErrors.name);
            document.getElementById("imei_er_span").textContent =
              validationErrors.device_imei_no;
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

  async function fetchModelOptions(setModelOptions) {
    try {
      const response = await api.get("device_model");
      if (response.data.success) {
        setModelOptions(response.data.data);
      } else {
        console.error("API request was not successful");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  return (
    <Row gutter={6}>
      <Col>
        <Card title="Edit Device">
          <Flex>
            <div className="container">
              <Form
                size="small"
                name="registrationForm"
                onFinish={onFinish}
                layout="vertical"
              >
                <Row gutter={[8, 8]}>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      initialValue={parentToChild[1]}
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
                        placeholder="Select Supplier"
                        optionFilterProp="children"
                        onChange={handleSupplierIdChange}
                        value={selectedSupplierId}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      initialValue={parentToChild[3]}
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
                        placeholder="Select Device Make"
                        optionFilterProp="children"
                        onChange={handleMakeIdChange}
                        value={selectedMakeId}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      initialValue={parentToChild[5]}
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
                        placeholder="Select Device Model"
                        optionFilterProp="children"
                        onChange={handleModelIdChange}
                        value={selectedModelId}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      initialValue={parentToChild[7]}
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
                    <Form.Item
                      initialValue={parentToChild[8]}
                      size="small"
                      label="Device UID"
                      name="uid"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      initialValue={parentToChild[9]}
                      size="small"
                      label="Device CCID"
                      name="ccid"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={12}>
                    <Form.Item>
                      <Space wrap>
                        <Button type="primary" shape="round" htmlType="submit">
                          Update
                        </Button>
                        <Button type="primary" shape="round">
                          Back
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>

                <span
                  id="imei_er_span"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                ></span>
              </Form>
              {isSubmitted && (
                <div style={{ marginTop: "16px" }}>
                  <Alert
                    message="Form submitted successfully!"
                    type="success"
                  />
                </div>
              )}
            </div>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
}
