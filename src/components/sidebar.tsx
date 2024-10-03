import { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { data } from "../configs/menu-config";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/store";
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);
  return (
    <>
      <Button
        type="text"
        className="lg:hidden fixed top-4 left-4 z-50"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
        className="lg:hidden"
      >
        <Menu
          theme="light"
          mode="inline"
          items={user?.role === "admin" ? data.admin : data.user}
          onClick={closeDrawer}
        />
      </Drawer>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        className="hidden lg:block h-screen"
        theme="light"
      >
        <div className="logo p-4 text-center text-2xl font-bold">
          {collapsed ? "L" : "Logo"}
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={user?.role === "admin" ? data.admin : data.user}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
