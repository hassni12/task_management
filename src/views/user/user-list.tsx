import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  notification,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import DeleteButton from "../../components/delete-button";
import { IAdminUser, IAuthRegisterUser } from "../../types/type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-store/store";
import { ColumnsType } from "antd/es/table";
import { fetchUsers } from "../../redux-store/slices/users";
import { AdminUserAPI } from "../../services/admin/admin-api";
import CustomModal from "../../components/custom-modal";
import { useBoolean } from "../../components/use-boolean";
import CreateUserModal from "./user-create";
import CreateUpdateModal from "./user-update";

const UserList: React.FC = () => {
  const isModalVisible = useBoolean();
  const isModalUpdateVisible = useBoolean();

  const isDeleteModalVisible = useBoolean();
  const [id, setId] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [userData, setUserData] = useState<IAuthRegisterUser>();

  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, page, total, perPage } = useSelector(
    (state: RootState) => state.users,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchUsers({ page, perPage }));
  }, []);

  const userDelete = () => {
    setLoadingBtn(true);
    AdminUserAPI.delete(id)
      .then(() => {
        notification.success({ message: "successfully deleted" });
        isDeleteModalVisible.onFalse();
        dispatch(fetchUsers({ page: 1, perPage: 10 }));
      })
      .finally(() => {
        setId("");
        setLoadingBtn(false);
      });
  };

  const columns: ColumnsType<IAdminUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (status: boolean) => (
        <div className="cursor-pointer d-flex justify-content-center align-items-center">
          {status ? (
            <Tag color="success">Active</Tag>
        ) : (
          <Tag color="warning">Inactive</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Options",
      key: "options",
      render: (_, row) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              isModalUpdateVisible.onTrue();
              setUserData(row);
            }}
          />
          <DeleteButton
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {
              isDeleteModalVisible.onTrue();
              setId(row.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const onChangePagination = (pagination: TablePaginationConfig) => {
    dispatch(
      fetchUsers({
        page: pagination.current ?? 1,
        perPage: pagination.pageSize ?? 10,
      })
    );
  };

  return (
    <>
      <Card>
        <Space className="flex justify-end w-full mb-3">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={isModalVisible.onTrue}
            style={{ width: "100%" }}
          >
            Add user
          </Button>
        </Space>
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{
            pageSize: perPage,
            current: page,
            total: total,
          }}
          rowKey={(record) => record.id}
          onChange={onChangePagination}
        />
      </Card>

      {isModalVisible.value && (
        <CreateUserModal
          visible={isModalVisible.value}
          onClose={isModalVisible.onFalse}
        />
      )}
      {isModalUpdateVisible.value && (
        <CreateUpdateModal
          userData={userData}
          visible={isModalUpdateVisible.value}
          onClose={isModalUpdateVisible.onFalse}
        />
      )}

      {isDeleteModalVisible.value && (
        <CustomModal
          click={userDelete}
          title="Delete User"
          subTitle="Are you sure you want to delete?"
          loading={loadingBtn}
          visible={isDeleteModalVisible.value}
          onClose={isDeleteModalVisible.onFalse}
        />
      )}
    </>
  );
};

export default UserList;
