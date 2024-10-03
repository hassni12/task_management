import React, { useEffect, useState } from "react";
import { Modal, Select, Form, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux-store/store";
import { IAssignTask } from "../../../types/type";
import { fetchUsers } from "../../../redux-store/slices/users";
import { AdminTaskAPI } from "../../../services/task/task-api";

interface IAssignTaskModalProps {
  visible: boolean;
  onClose: () => void;
  taskId: string;
  projectId: string | undefined;
}

const AssignTaskModal: React.FC<IAssignTaskModalProps> = ({
  visible,
  onClose,
  taskId,
  projectId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, loading } = useSelector((state: RootState) => state.users);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [form] = Form.useForm<IAssignTask>();

  useEffect(() => {
    if (visible) {
      dispatch(fetchUsers({ page: 1, perPage: 10 }));
    }
  }, [visible, dispatch]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLoadingBtn(true);

        if (projectId) {
          AdminTaskAPI.assignTask(projectId, taskId, {
            assignee_id: values.assignee_id,
          })
            .then(() => {
              notification.success({
                message: "User Assigned to Task",
              });
              onClose();
            })
            .catch(() => {
              notification.error({
                message: "Assignment Failed",
              });
            })
            .finally(() => {
              setLoadingBtn(false);
            });
        }
      })
      .catch((info) => {
        console.log("Form validation failed:", info);
      });
  };

  return (
    <Modal
      title="Assign User to Task"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Assign"
      cancelText="Cancel"
      confirmLoading={loadingBtn}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="assignee_id"
          label="Select User"
          rules={[{ required: true, message: "Please select a user!" }]}
        >
          <Select
            placeholder="Select a user"
            style={{ width: "100%" }}
            loading={loading}
          >
            {allUsers.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignTaskModal;
