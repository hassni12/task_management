import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Typography, notification } from "antd";
import { Link } from "react-router-dom";
import { AuthAPI } from "../../services/auth/auth-api";
import { setSession } from "../../utils/jwt-utils";
import { IAuthLogin } from "../../types/services-type";

const { Title } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: IAuthLogin) => {
    const body = {
      password: values.password,
      email: values.email,
    };
    setLoading(true);
    AuthAPI.login(body)
      .then((res) => {
        console.log(res?.data?.token)
        // setSession(res.data.token);
        notification.success({ message: "Login successful!" });
        form.resetFields();
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-2">
        <Card className="shadow-md">
          <div className="my-3 text-center">
            <Title level={2} className="text-sm font-bold">
              Task Manager
            </Title>
          </div>
          New user?{" "}
          <Link
            to="/register"
            className=" text-blue-500 hover:underline font-semibold text-xs"
          >
            Create New Account
          </Link>
          <Form layout="vertical" form={form} onFinish={handleLogin}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="mr-2" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="mr-2" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Login;
