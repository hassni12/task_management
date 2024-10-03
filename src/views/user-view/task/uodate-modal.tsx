import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  notification,
} from "antd";
import { TaskStatus, ITask } from "../../../types/type";
import { AdminTaskAPI } from "../../../services/task/task-api";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../redux-store/slices/task";
import { AppDispatch, RootState } from "../../../redux-store/store";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const UpdateTaskModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  projectId: string | undefined;
  task: ITask | null;
}> = ({ visible, onClose, projectId, task }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (task && visible) {
      form.setFieldsValue({
        ...task,
        due_date: moment(task.due_date),
      });
    }
  }, [form, task, visible]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedTask = {
          ...values,
          due_date: values.due_date.format("YYYY-MM-DD HH:mm:ss"),
        };

        setLoading(true);
        AdminTaskAPI.updateTask(projectId, task?.id, formattedTask)
          .then(() => {
            if (projectId) {
              dispatch(fetchTasks({ projectId }));
            }
            notification.success({
              message: "Task updated successfully!",
            });
          })
          .finally(() => {
            form.resetFields();
            onClose();
            setLoading(false);
          });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
        setLoading(false);
      });
  };

  const { allTasks, loading } = useSelector((state: RootState) => state.task);

  return (
    <Modal
      title="Update Task"
      open={visible}
      onCancel={onClose}
      footer={null}
      width="600px"
      className="p-6"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: TaskStatus.TODO }}
      >
        <Form.Item name="parent_id" label="Parent Task">
          <Select placeholder="Select a Parent Task" loading={loading}>
            {!loading &&
              allTasks?.map((task) => (
                <Option key={task.id} value={task.id}>
                  {task.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: "Task name is required" }]}
        >
          <Input placeholder="Enter Task Name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <TextArea rows={3} placeholder="Enter Description" />
        </Form.Item>

        <Form.Item
          name="due_date"
          label="Due Date"
          rules={[{ required: true, message: "Due date is required" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select placeholder="Select Status" className="w-full">
            <Option value={TaskStatus.TODO}>To Do</Option>
            <Option value={TaskStatus.IN_PROCESS}>In Process</Option>
            <Option value={TaskStatus.TESTING}>Testing</Option>
            <Option value={TaskStatus.HOLD}>Hold</Option>
            <Option value={TaskStatus.COMPLETED}>Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Task
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;
