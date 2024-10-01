import React, { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPI } from "../../services/auth/auth-api";
import { IAuthRegisterUser } from "../../types/services-type";
import { setSession } from "../../utils/jwt-utils";

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (values: IAuthRegisterUser) => {
    const body = {
      password: values.password,
      name: values.name,
      email: values.email,
    };
    setLoading(true);
    AuthAPI.register(body)
      .then((res) => {
        console.log(res.data.token)
        // setSession(res.data.data.token);
        notification.success({ message: "Registration successful!" });
        form.resetFields();
        navigate("/login", { replace: true });
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
          Already have an account?{" "}
          <Link
            to="/login"
            className=" text-blue-500 hover:underline font-semibold text-xs"
          >
            Login
          </Link>
          <Form layout="vertical" form={form} onFinish={handleRegister}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="mr-2" />}
                placeholder="Enter Your Name"
              />
            </Form.Item>
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Register;
