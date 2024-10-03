import React, { useCallback, useState } from "react";
import { Modal, Input, Button, List, Collapse, Tag } from "antd";
import { IComment, ITask, TaskStatus } from "../../../types/type";
import { resetTaskDetails } from "../../../redux-store/slices/task-details";
import { AppDispatch } from "../../../redux-store/store";
import { useDispatch } from "react-redux";
const { Panel } = Collapse;
const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "blue",
  [TaskStatus.IN_PROCESS]: "orange",
  [TaskStatus.TESTING]: "purple",
  [TaskStatus.HOLD]: "red",
  [TaskStatus.COMPLETED]: "green",
};
interface TaskDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedTask: ITask | null;
  subtasks: ITask[];
  comments: IComment[];
  onAddComment: (comment: string) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  visible,
  onClose,
  selectedTask,
  subtasks,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddComment = useCallback(() => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment(""); 
    }
  }, [newComment, onAddComment]); 


  return (
    <Modal
      title="Task Details"
      open={visible}
      onCancel={() => {
        onClose();
        dispatch(resetTaskDetails());
      }}
      footer={null}
      width="80%"
    >
      {selectedTask && (
        <div>
          <h4 className="font-semibold text-lg">{selectedTask.name}</h4>
          <p>
            <strong>Description:</strong> {selectedTask.description}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(selectedTask.due_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {selectedTask.status}
          </p>
          <p>
            <strong>Assigned To:</strong> {selectedTask.assignee_id}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedTask.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(selectedTask.updated_at).toLocaleString()}
          </p>

          <Collapse className="mt-4" defaultActiveKey={["1"]}>
            <Panel header="Subtasks" key="1">
              {subtasks.length > 0 ? (
                <List
                  bordered
                  dataSource={subtasks}
                  renderItem={(subTask) => (
                    <List.Item>
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                          <h5 className="font-semibold">{subTask.name}</h5>
                          <Tag color={statusColors[subTask.status]}>
                            {subTask.status}
                          </Tag>
                        </div>
                        <p className="text-gray-600">{subTask.description}</p>
                        <p className="text-gray-500">
                          Due: {new Date(subTask.created_at).toLocaleString()}
                        </p>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <p>No subtasks available.</p>
              )}
            </Panel>
          </Collapse>
          <Collapse className="mt-4" defaultActiveKey={["2"]}>
            <Collapse.Panel header="Comments" key="2">
              <List
                bordered
                dataSource={comments}
                renderItem={(item) => (
                  <List.Item>
                    <div>
                      <p>{item.content}</p>
                      <p><em>{new Date(item.created_at).toLocaleString()}</em></p>

                      {item.replies.length > 0 && (
                        <List
                          bordered
                          dataSource={item.replies}
                          renderItem={(reply) => (
                            <List.Item>
                              <div>
                                <p>{reply.content}</p>
                                <p><em>{new Date(reply.created_at).toLocaleString()}</em></p>
                              </div>
                            </List.Item>
                          )}
                        />
                      )}
                    </div>
                  </List.Item>
                )}
              />
              <Input.TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={4}
                className="mt-2"
              />
              <Button
                type="primary"
                onClick={handleAddComment}
                className="mt-2"
              >
                Add Comment
              </Button>
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
    </Modal>
  );
};

export default TaskDetailsModal;
