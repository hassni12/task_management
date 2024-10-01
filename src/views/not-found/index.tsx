import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex text-8xl font-bold">
          <h1 className="text-blue-500">4</h1>
          <h1 className="text-gray-900">0</h1>
          <h1 className="text-red-500">4</h1>
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-4">page not found</h1>
        <Button type="primary" icon={<ArrowLeftOutlined />}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
