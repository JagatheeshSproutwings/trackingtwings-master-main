import React, { useState } from "react";
import { Row, Col, Button, Form, Input, Modal, notification } from "antd";
import api from "configs/apiConfig";
import Flex from "components/shared-components/Flex";

const Config = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      await api.post("config/store", values);
      form.resetFields();
      props.parentFunction();
      openNotification(
        "success",
        "Vehicle",
        "Vehicle Settings Saved Successfully!"
      );
      handleOk();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const errorData = error.response.data;
      }
    }
  };

  return (
    <Row gutter={6}>
      <Col>
        <Flex>
          <div className="container">
            <Modal
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
                onFinish={onSubmit}
              >
                <Row gutter={[8, 8]}>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      name="vehicle_id"
                      hidden
                      initialValue={parentToChild.vehicle_id}
                    >
                      <Input type="text"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      name="device_imei"
                      hidden
                      initialValue={parentToChild.device_imei}
                    >
                      <Input type="text"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Parking Alert Time"
                      name="parking_alert_time"
                      initialValue={parentToChild.parking_alert_time}
                    >
                      <Input placeholder="Parking Alert Time" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      size="small"
                      label="Idle Alert Time"
                      name="idle_alert_time"
                      initialValue={parentToChild.idle_alert_time}
                    >
                      <Input placeholder="Idle Alert Time" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Speed Limit"
                      name="speed_limit"
                      initialValue={parentToChild.speed_limit}
                    >
                      <Input placeholder="Speed Limit"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Expected Mileage"
                      name="expected_mileage"
                      initialValue={parentToChild.expected_mileage}
                    >
                      <Input placeholder="Expected Mileage"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Idle RPM"
                      name="idle_rpm"
                      initialValue={parentToChild.idle_rpm}
                    >
                      <Input placeholder="Idle RPM"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Maximum RPM"
                      name="max_rpm"
                      initialValue={parentToChild.max_rpm}
                    >
                      <Input placeholder="Maximum RPM"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      name="temp_low"
                      label="Minimum Temp"
                      initialValue={parentToChild.temp_low}
                    >
                      <Input placeholder="Minimum Temperature"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      name="temp_high"
                      label="Maximum Temp"
                      initialValue={parentToChild.temp_high}
                    >
                      <Input placeholder="Maximum Temperature"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Fuel Fill Limit"
                      name="fuel_fill_limit"
                      initialValue={parentToChild.fuel_fill_limit}
                    >
                      <Input placeholder="Fuel Fill Limit"></Input>
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <Form.Item
                      label="Fuel Dip Limit"
                      name="fuel_dip_limit"
                      initialValue={parentToChild.fuel_dip_limit}
                    >
                      <Input placeholder="Fuel Dip Limit"></Input>
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

export default Config;
