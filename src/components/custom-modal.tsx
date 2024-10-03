import React from 'react';
import { Modal, Button } from 'antd';

interface CustomModalProps {
  title: string;
  subTitle?: string; 
  click: () => void;
  loading: boolean;
  visible: boolean; 
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  subTitle,
  click,
  loading,
  visible,
  onClose,
}) => {
  return (
    <Modal
      closable={false}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="p-4" 
    >
      <h2 className="text-xl font-semibold p-2">{title}</h2>
      {subTitle && (
        <h3 className="text-md text-gray-600 p-2">{subTitle}</h3> // Subtitle styling
      )}
      <div className="flex justify-end mb-1">
        <Button
          type="primary"
          className="mr-2"
          onClick={click}
          loading={loading}
        >
          Yes
        </Button>
        <Button onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
