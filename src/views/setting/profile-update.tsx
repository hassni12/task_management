import React, { useEffect } from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import { notification } from "antd";
import { useState } from "react";
import {  IProfileUpdate } from "../../types/type";
import { AppDispatch, RootState } from "../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux-store/slices/profile";
import { ProfileAPI } from "../../services/profile/profile-api";

const { Option } = Select;

const ProfileUpdate: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();
  const { profile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name || "",
        email: profile.email || "",
        password: "",
        role: profile.role || "user",
        is_active: profile.is_active || false,
      });
    }
  }, [profile, form]);

  const handleFinish = async (values: IProfileUpdate) => {
    setLoading(true);
    ProfileAPI.updateProfile(values)
      .then((res) => {
        notification.success({ message: "update successful!" });
        fetchProfile();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: profile?.name || "",
          email: profile?.email || "",
          password: "",
          role: profile?.role || "user",
          is_active: profile?.is_active || false,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            // { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select your role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Active" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
