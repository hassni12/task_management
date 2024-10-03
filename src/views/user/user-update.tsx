import React, { useState } from "react";
import { Modal, Form, Input, Select, notification, Switch } from "antd";
import { IAuthRegisterUser } from "../../types/type";
import { AdminUserAPI } from "../../services/admin/admin-api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { fetchUsers } from "../../redux-store/slices/users";

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  userData: IAuthRegisterUser | undefined;
}

const CreateUpdateModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  userData,
}) => {
  const [form] = Form.useForm<IAuthRegisterUser>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);

        AdminUserAPI.update(userData?.id ?? "", values)

          .then(() => {
            notification.success({
              message: "Update successful!",
            });
            dispatch(fetchUsers({ page: 1, perPage: 10 }));
            form.resetFields();
            onClose();
          })
          .catch((error) => {
            notification.error({ message: error.message });
          })
          .finally(() => setLoading(false));
      })
      .catch((info) => {
        console.log("Form validation failed:", info);
      });
  };

  return (
    <Modal
      title={userData ? "Update User" : "Create New User"}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Update"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...userData,
          is_active: userData?.is_active ?? true,
        }}
      >
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
            { required: !userData, message: "Please input the password!" },
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
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Active">
          <Form.Item name="is_active" valuePropName="checked" noStyle>
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdateModal;
