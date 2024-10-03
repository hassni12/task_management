import React, { useState } from "react";
import { Modal, Form, Input, Select, notification } from "antd";
import { IAuthRegisterUser } from "../../types/type";
import { AdminUserAPI } from "../../services/admin/admin-api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { fetchUsers } from "../../redux-store/slices/users";

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<AddUserModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm<IAuthRegisterUser>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        AdminUserAPI.create(values)
          .then(() => {
            notification.success({ message: "create successful!" });
            dispatch(fetchUsers({ page: 1, perPage: 10 }));
            form.resetFields();
            onClose();
          })
          .finally(() => setLoading(false));
      })
      .catch((info) => {
        console.log("Form validation failed:", info);
      });
  };

  return (
    <Modal
      title="Create New User"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Create"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" initialValues={{}}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user's name!" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the user's email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input the password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select role">
            <Select.Option key='user' value="user">User</Select.Option>
            <Select.Option key='admin' value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
