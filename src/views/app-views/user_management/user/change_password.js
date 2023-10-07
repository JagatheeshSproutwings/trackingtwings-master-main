import React, { useState } from "react";
import { Button, Input, Form, Row, Col, Space, notification } from "antd";
import api from "configs/apiConfig";
import { GREEN_BASE } from "constants/ThemeConstant";

const ChangePassword = ({ parentToChild, ...props }) => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");

  function handlePassword(event) {
    let new_pass = event;
    setPassword(new_pass);

    // Regular expressions to validate password
    var lowerCase = /[a-z]/g;
    // var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // var symbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g;

    if (!new_pass.match(lowerCase)) {
      openNotification("info", "Password", "Should contain lowercase letters!");
    }
    // else if (!new_pass.match(upperCase)) {
    //   openNotification("info", "Password", "Should contain uppercase letters!");
    // }
    else if (!new_pass.match(numbers)) {
      openNotification("info", "Password", "Should contain numbers!");
    }
    // else if (!new_pass.match(symbols)) {
    //   openNotification("info", "Password", "Should contain one symbol!");
    // }
    else if (new_pass.length < 8) {
      openNotification("info", "Password", "length should be minimum 8");
    } else {
      return "OK";
    }
  }

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onFinish = async (values) => {
    const res = handlePassword(values["password"]);
    if (res == "OK") {
      try {
        const data = {
          old_password: values["old_password"],
          new_password: values["password"],
          user_id: parentToChild[0],
        };
        console.log(values);
        console.log(data);
        await api.post("change_password", data);
        form.resetFields();
        props.parentFunction();

        openNotification(
          "success",
          "User",
          "User Password Changed Successfully!"
        );
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const errorData = error.response.data;
          if (errorData.message && typeof errorData.message === "object") {
            const validationErrors = errorData.message;
            if (validationErrors.hasOwnProperty("name")) {
              openNotification("info", "Name", "Given Name is Already Exists");
            }
            if (validationErrors.hasOwnProperty("email")) {
              openNotification(
                "info",
                "E-Mail ID",
                "Given E-Mail ID is Already Exists"
              );
            }
            if (validationErrors.hasOwnProperty("mobile_no")) {
              openNotification(
                "info",
                "Mobile No",
                "Given Mobile No is Already Exists"
              );
            }
          }
        }
      }
    } else {
      openNotification(
        "error",
        "Password",
        "Password Should be as per the rules"
      );
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
            value={password}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form.Item
            label="Confirm Password"
            name="c_password"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
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

export default ChangePassword;
