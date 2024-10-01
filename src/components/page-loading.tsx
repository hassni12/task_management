import React from "react";
import { Spin } from "antd";

interface PageLoadingProps {
  size?: "large" | "small" | "default";
}

const PageLoading: React.FC<PageLoadingProps> = ({ size = "large" }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-100">
      <Spin size={size} />
    </div>
  );
};

export default PageLoading;
