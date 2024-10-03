import React, { useEffect, useState } from "react";
import { Modal, Select, Form, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-store/store";
import { clearAllUsers, fetchUsers } from "../../redux-store/slices/users";
import { AdminProjectAPI } from "../../services/admin/admin-api";
import { fetchProjects } from "../../redux-store/slices/project";
import { IAssignUsers, IProject } from "../../types/type";

interface IAssignUsersModalProps {
  visible: boolean;
  onClose: () => void;
  project: IProject | undefined;
}

const AssignUsersModal: React.FC<IAssignUsersModalProps> = ({
  visible,
  onClose,
  project,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, loading, total, page, perPage } = useSelector(
    (state: RootState) => state.users
  );
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [form] = Form.useForm<IAssignUsers>();

  useEffect(() => {
    if (visible) {
      dispatch(fetchUsers({ page: 1, perPage }));
    }
  }, [visible, dispatch, perPage]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLoadingBtn(true);
        AdminProjectAPI.assignUsersToProject(project?.id ?? "", values)
          .then(() => {
            notification.success({
              message: "Users Assigned",
            });
            dispatch(fetchProjects({ page: 1, perPage: 10 }));
            dispatch(clearAllUsers());
            onClose();
          })
          .catch(() => {
            notification.error({
              message: "Assignment Failed",
            });
          });
      })
      .catch((info) => {
        console.log("Form validation failed:", info);
      });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;

    if (bottom && !loading && allUsers.length < total) {
      dispatch(fetchUsers({ page: page + 1, perPage }));
    }
  };

  return (
    <Modal
      title="Assign Users to Project"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Assign"
      cancelText="Cancel"
      confirmLoading={loadingBtn}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          user_ids: project?.users.map((user) => user.id),
        }}
      >
        <Form.Item
          name="user_ids"
          label="Select Users"
          rules={[{ required: true, message: "Please select users!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select users"
            style={{ width: "100%" }}
            loading={loading}
            onPopupScroll={handleScroll}
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

export default AssignUsersModal;
