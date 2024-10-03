import React, { useState } from "react";
import { Modal, Form, Input, notification, Switch } from "antd";
import { AdminProjectAPI } from "../../services/admin/admin-api";
import { fetchProjects } from "../../redux-store/slices/project";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { IUpdateProject } from "../../types/type";

interface CreateProjectModalProps {
  visible: boolean;
  onClose: () => void;
  projectData: IUpdateProject | undefined;
}

const UpdateProjectModal: React.FC<CreateProjectModalProps> = ({
  visible,
  onClose,
  projectData,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<IUpdateProject>();
  const dispatch = useDispatch<AppDispatch>();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        setLoading(true);
        return AdminProjectAPI.updateProject(projectData?.id ?? "", values);
      })
      .then(() => {
        notification.success({
          message: "Update Successfully",
        });
        dispatch(fetchProjects({ page: 1, perPage: 10 }));
        
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      })
      .finally(() => {
        onClose();
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...projectData,
          is_active: projectData?.is_active ?? true,
        }}
      >
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
        <Form.Item label="Active">
          <Form.Item name="is_active" valuePropName="checked" noStyle>
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProjectModal;
