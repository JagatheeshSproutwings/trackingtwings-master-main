import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
} from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";

const AdminUpdate = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [vehicleTypeList, SetVehicleTypeList] = useState([]);

  useEffect(() => {
    CustomerChange();
  }, []);

  const handleOk = () => {
    props.parentFunction();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.parentFunction();
    setIsModalOpen(false);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onSubmit = async (values) => {
    try {
      values["id"] = parentToChild["id"];
      await api.post("customer_vehicle_update", values);
      form.resetFields();
      props.parentFunction();
      openNotification(
        "success",
        "Vehicle",
        "Vehicle Settings Updated Successfully!"
      );
      handleOk();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
      }
    }
  };

  const CustomerChange = async () => {
    SetVehicleTypeList([]);
    const vehicle_type_list = await api
      .get("vehicle_type")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    SetVehicleTypeList(vehicle_type_list?.data?.data);
  };

  console.log(parentToChild);

  return (
    <Row gutter={6}>
      <Col>
        <Flex>
          <div className="container">
            <Modal
              width={300}
              title="Vehicle Settings"
              visible={isModalOpen} // Change "open" to "visible"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null} // Set the footer to null to hide it
            >
              <Form
                form={form}
                size="small"
                name="settings_form"
                layout="vertical"
                onFinish={onSubmit}
              >
                <Row gutter={[6, 6]}>
                  <Col sm={24} md={24} lg={24}>
                    <Form.Item
                      initialValue={parentToChild["vehicle_type_id"]}
                      label="Vehicle Type"
                      name="vehicle_type_id"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Vehicle Type",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        value={parentToChild["id"]}
                        placeholder="Select Vehicle Type"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {Array.isArray(vehicleTypeList) ? (
                          vehicleTypeList.map((vehicletype) => (
                            <Select.Option
                              key={vehicletype?.id}
                              value={vehicletype?.id}
                            >
                              {vehicletype?.vehicle_type}
                            </Select.Option>
                          ))
                        ) : (
                          <Select.Option></Select.Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[6, 6]}>
                  <Col sm={24} md={24} lg={24}>
                    <Form.Item
                      size="small"
                      label="Vehicle Name"
                      name="vehicle_name"
                      initialValue={parentToChild["vehicle_name"]}
                    >
                      <Input placeholder="Vehicle Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};

export default AdminUpdate;
