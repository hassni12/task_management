import React from "react";
import { Layout, Dropdown, Avatar, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux-store/store";
import { AuthAPI } from "../services/auth/auth-api";
import { clearUser } from "../redux-store/slices/auth";
import { paths } from "../routes/paths";
import { STORAGE_KEY } from "../constants/constant";
import { clearProfile } from "../redux-store/slices/profile";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthAPI.logout()
      .then(() => {
        localStorage.removeItem(STORAGE_KEY);
        dispatch(clearUser());
        dispatch(clearProfile());
        navigate(paths.auth.jwt.login);
        message.success("Logged out successfully");
      })
      .catch(() => {
        message.error("Logout failed");
      })
      .finally(() => {});
  };

  const menuItems = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <Header className="bg-white flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-bold ml-9 sm:ml-0">
        {pathname.split("/")[1]}
      </div>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <div className="flex items-center cursor-pointer">
          <Avatar size="large" src="https://via.placeholder.com/150" />{" "}
          <span className="ml-2">
            {user?.name} <DownOutlined />
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
