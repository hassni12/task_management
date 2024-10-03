import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import PageLoading from "../components/page-loading";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const { Content, Header, Footer } = Layout;

const AppLayout = () => {
  return (
    <Layout className="flex min-h-screen">
      <Sidebar />
      <Layout className="flex-1">
        <Header className="bg-white shadow-md p-0">
          <Navbar />
        </Header>
        <Content className="p-6">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer className="text-center">
          test © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
