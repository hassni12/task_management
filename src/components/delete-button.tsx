import React from "react";
import { Button, ButtonProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type SizeType = "small" | "middle" | "large";
interface DeleteButtonProps extends ButtonProps {
  size?: SizeType;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  size,
  onClick,
  type = "default",
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  return (
    <Button
      size={size}
      icon={<DeleteOutlined />}
      onClick={handleClick}
      type={type}
      {...props}
    />
  );
};

export default DeleteButton;
