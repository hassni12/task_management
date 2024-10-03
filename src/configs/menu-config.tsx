import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
const adminRoutes: MenuProps["items"] = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <ProjectOutlined />,
    label: <Link to="project">Project</Link>,
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: <Link to="user">User</Link>,
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: <Link to="settings">Settings</Link>,
  },
];

const userRoutes: MenuProps["items"] = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <ProjectOutlined />,
    label: <Link to="user/project">Project</Link>,
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: <Link to="user/settings">Settings</Link>,
  },
];

export const data = {
  admin: adminRoutes,
  user: userRoutes,
};
