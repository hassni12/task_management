import { PicRightOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, TablePaginationConfig, Tag } from "antd";
import React, { useEffect } from "react";
import { IProject } from "../../../types/type";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux-store/store";
import { fetchProjects } from "../../../redux-store/slices/project";
import { ColumnsType } from "antd/es/table";
import { fetchUserProjects } from "../../../redux-store/slices/user-project";
import { useNavigate } from "react-router-dom";

const ProjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { projects, loading, page, total, perPage } = useSelector(
    (state: RootState) => state.userProject,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchUserProjects({ page, perPage }));
  }, []);
  const goToTask = (row: string): void => {
    navigate(`/user/${row}/task`);
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
            icon={<PicRightOutlined />}
            onClick={() => {
              goToTask(row.id);
            }}
          />
        </Space>
      ),
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
        />
      </Card>
      {/*  */}
    </>
  );
};

export default ProjectList;
