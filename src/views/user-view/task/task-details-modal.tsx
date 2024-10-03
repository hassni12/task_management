import React, { useMemo, useState } from "react";
import {
  Modal,
  Input,
  Button,
  List,
  Collapse,
  Tag,
  Space,
  notification,
} from "antd";
import { IComment, ITask, TaskStatus } from "../../../types/type";
import { resetTaskDetails } from "../../../redux-store/slices/task-details";
import { AppDispatch, RootState } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AdminCommentAPI } from "../../../services/comments/comments";
import { fetchComments } from "../../../redux-store/slices/comments";

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
  onAddComment: (comment: string, commentId?: string | null) => void;
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
  const [updateComment, setUpdateComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleUpdateComment = (comment: IComment) => {
    setCommentToEdit(comment);
    setIsEditing(true);
    setUpdateComment(comment.content);
  };

  const handleConfirmUpdate = () => {
    if (commentToEdit && selectedTask) {
      AdminCommentAPI.updateComment(
        selectedTask.project_id,
        selectedTask.id,
        commentToEdit.id,
        { content: updateComment.trim() }
      )
        .then(() => {
          notification.success({ message: "Comment updated successfully!" });
          dispatch(fetchComments({ projectId: selectedTask.project_id, taskId: selectedTask.id }));
          resetCommentState();
        })
        .catch(() => {
          notification.error({ message: "Failed to update comment." });
        });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (selectedTask) {
      Modal.confirm({
        title: "Delete Comment",
        content: "Are you sure you want to delete this comment?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          AdminCommentAPI.deleteComment(selectedTask.project_id, selectedTask.id, commentId)
            .then(() => {
              notification.success({ message: "Comment deleted successfully!" });
              dispatch(fetchComments({ projectId: selectedTask.project_id, taskId: selectedTask.id }));
            })
            .catch(() => {
              notification.error({ message: "Failed to delete comment." });
            });
        },
      });
    }
  };

  const resetCommentState = () => {
    setIsEditing(false);
    setUpdateComment("");
    setCommentToEdit(null);
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const collapseItems = useMemo(
    () => [
      {
        key: "1",
        label: "Subtasks",
        children: subtasks.length > 0 ? (
          <List
            bordered
            dataSource={subtasks}
            renderItem={(subTask) => (
              <List.Item>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h5 className="font-semibold">{subTask.name}</h5>
                    <Tag color={statusColors[subTask.status]}>{subTask.status}</Tag>
                  </div>
                  <p className="text-gray-600">{subTask.description}</p>
                  <p className="text-gray-500">Due: {new Date(subTask.created_at).toLocaleString()}</p>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p>No subtasks available.</p>
        ),
      },
      {
        key: "2",
        label: "Comments",
        children: (
          <>
            <List
              bordered
              dataSource={comments}
              renderItem={(item) => (
                <List.Item className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex justify-between w-full">
                    <div>
                      {isEditing && commentToEdit?.id === item.id ? (
                        <>
                          <Input.TextArea
                            value={updateComment}
                            onChange={(e) => setUpdateComment(e.target.value)}
                            placeholder="Edit your comment..."
                            rows={2}
                          />
                          <Space className="p-2">
                            <Button type="primary" onClick={handleConfirmUpdate}>
                              Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                          </Space>
                        </>
                      ) : (
                        <>
                          <p>{item.content}</p>
                          <p>
                            <em>{new Date(item.created_at).toLocaleString()}</em>
                          </p>
                        </>
                      )}

                      {item.replies.length > 0 && (
                        <List
                          className="ml-5 mt-3"
                          bordered
                          dataSource={item.replies}
                          renderItem={(reply) => (
                            <List.Item className="bg-gray-50 p-2 rounded-md">
                              <div>
                                <p>{reply.content}</p>
                                <p className="text-gray-400 text-xs">
                                  <em>{new Date(reply.created_at).toLocaleString()}</em>
                                </p>
                              </div>
                            </List.Item>
                          )}
                        />
                      )}

                      {replyingTo === item.id && (
                        <div className="mt-2">
                          <Input.TextArea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            rows={2}
                          />
                          <Space className="mt-2">
                            <Button
                              type="primary"
                              onClick={() => {
                                onAddComment(replyText, item.id);
                                setReplyText("");
                                setReplyingTo(null);
                              }}
                            >
                              Add Reply
                            </Button>
                            <Button onClick={() => setReplyingTo(null)}>Cancel</Button>
                          </Space>
                        </div>
                      )}
                    </div>

                    {user?.id === item.user_id && (
                      <Space>
                        <Button icon={<EditOutlined />} size="small" onClick={() => handleUpdateComment(item)} />
                        <Button icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteComment(item.id)} />
                      </Space>
                    )}

                    {replyingTo !== item.id && (
                      <Button size="small" type="link" onClick={() => handleReplyClick(item.id)}>
                        Reply
                      </Button>
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
              onClick={() => {
                onAddComment(newComment);
                setNewComment("");
              }}
              className="mt-2"
            >
              Add Comment
            </Button>
          </>
        ),
      },
    ],
    [comments, newComment, replyText, subtasks, isEditing, commentToEdit, replyingTo]
  );

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
            <strong>Due Date:</strong> {new Date(selectedTask.due_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {selectedTask.status}
          </p>
          <p>
            <strong>Assigned To:</strong> {selectedTask.assignee_id}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(selectedTask.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong> {new Date(selectedTask.updated_at).toLocaleString()}
          </p>
          <Collapse items={collapseItems} className="mt-4" defaultActiveKey={["2"]} />
        </div>
      )}
    </Modal>
  );
};

export default TaskDetailsModal;
