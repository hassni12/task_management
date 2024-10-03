import React, { useState } from "react";
import { Modal, Form, Input, notification } from "antd";
import { AdminProjectAPI } from "../../services/admin/admin-api";
import { fetchProjects } from "../../redux-store/slices/project";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { ICreateProject } from "../../types/type";

interface CreateProjectModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ICreateProject>();
  const dispatch = useDispatch<AppDispatch>();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true);
        return AdminProjectAPI.createProject(values);
      })
      .then(() => {
        notification.success({
          message: "Created Successfully",
        });
        dispatch(fetchProjects({ page: 1, perPage: 10 }));
        form.resetFields();
        onClose();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <Modal
      title="Create New Project"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Create"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            { required: true, message: "Please input the project name!" },
          ]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the project description!",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter project description" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
