import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UsergroupAddOutlined,
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
import {
  IProject,
  IProjectUser,
  IUpdateProject,
} from "../../types/type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux-store/store";
import { fetchProjects } from "../../redux-store/slices/project";
import { ColumnsType } from "antd/es/table";
import { useBoolean } from "../../components/use-boolean";
import CustomModal from "../../components/custom-modal";
import { AdminProjectAPI } from "../../services/admin/admin-api";
import CreateProjectModal from "./create-project";
import UpdateProjectModal from "./update-project";
import AssignUsersModal from "./assign-user";

const ProjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalVisible = useBoolean();
  const isModalAssignVisible = useBoolean();

  const isModalUpdateVisible = useBoolean();
  const isDeleteModalVisible = useBoolean();
  const [id, setId] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [projectData, setProjectData] = useState<IUpdateProject>();
  const [projectDataAssign, setProjectDataAssign] = useState<IProject>();

  const { projects, loading, page, total, perPage } = useSelector(
    (state: RootState) => state.project,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchProjects({ page, perPage }));
  }, []);
  const projectDelete = () => {
    setLoadingBtn(true);
    AdminProjectAPI.deleteProject(id)
      .then(() => {
        notification.success({ message: "successfully deleted" });
        isDeleteModalVisible.onFalse();
        dispatch(fetchProjects({ page: 1, perPage: 10 }));
      })
      .finally(() => {
        setId("");
        setLoadingBtn(false);
      });
  };
  const columns: ColumnsType<IProject> = [
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
              setProjectData(row);
            }}
          />
          <Button
            icon={<UsergroupAddOutlined />}
            onClick={() => {
              isModalAssignVisible.onTrue();
              setProjectDataAssign(row);
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
  const userColumns: ColumnsType<IProjectUser> = [
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
  ];
  const onChangePagination = (pagination: TablePaginationConfig) => {
    dispatch(
      fetchProjects({
        page: pagination.current ?? 1,
        perPage: pagination.pageSize ?? 10,
      })
    );
  };
  return (
    <>
      {" "}
      <Card>
        <Space className="flex justify-end w-full mb-3">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={isModalVisible.onTrue}
            style={{ width: "100%" }}
          >
            Add project
          </Button>
        </Space>
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={projects}
          loading={loading}
          pagination={{
            pageSize: perPage,
            current: page,
            total: total,
          }}
          rowKey={(record) => record.id}
          onChange={onChangePagination}
          expandable={{
            expandedRowRender: (record) => {
              const users = record.users || [];
              return (
                <Table
                  columns={userColumns}
                  dataSource={users}
                  pagination={false}
                  rowKey="id"
                />
              );
            },
            rowExpandable: (record) => record.users && record.users.length > 0,
          }}
        />
      </Card>
      {isModalVisible.value && (
        <CreateProjectModal
          visible={isModalVisible.value}
          onClose={isModalVisible.onFalse}
        />
      )}
      {isModalUpdateVisible.value && (
        <UpdateProjectModal
          projectData={projectData}
          visible={isModalUpdateVisible.value}
          onClose={isModalUpdateVisible.onFalse}
        />
      )}
      {isModalAssignVisible.value && (
        <AssignUsersModal
          project={projectDataAssign}
          visible={isModalAssignVisible.value}
          onClose={isModalAssignVisible.onFalse}
        />
      )}
      {isDeleteModalVisible.value && (
        <CustomModal
          click={projectDelete}
          title="Delete Project"
          subTitle="Are you sure you want to project?"
          loading={loadingBtn}
          visible={isDeleteModalVisible.value}
          onClose={isDeleteModalVisible.onFalse}
        />
      )}
    </>
  );
};

export default ProjectList;
