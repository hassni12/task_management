import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Alert, Space, Button, notification } from "antd";
import { ITask, TaskStatus } from "../../../types/type";
import { AppDispatch, RootState } from "../../../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTasks } from "../../../redux-store/slices/task";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useBoolean } from "../../../components/use-boolean";
import CreateTaskModal from "./create-task";
import { AdminTaskAPI } from "../../../services/task/task-api";
import TaskDetailsModal from "./task-details-modal";
import { fetchTaskDetails } from "../../../redux-store/slices/task-details";
import {
  addComment,
  fetchComments,
} from "../../../redux-store/slices/comments";
import CustomModal from "../../../components/custom-modal";
import DeleteButton from "../../../components/delete-button";
import UpdateTaskModal from "./uodate-modal";
import AssignTaskModal from "./assign-task";

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "bg-blue-100 text-blue-800",
  [TaskStatus.IN_PROCESS]: "bg-yellow-100 text-yellow-800",
  [TaskStatus.TESTING]: "bg-orange-100 text-orange-800",
  [TaskStatus.HOLD]: "bg-red-100 text-red-800",
  [TaskStatus.COMPLETED]: "bg-green-100 text-green-800",
};

const TaskBoard: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isModalCreateVisible = useBoolean();
  const isModalAssignVisible = useBoolean();
  const isDeleteModalVisible = useBoolean();
  const isModalUpdateVisible = useBoolean();
  const isModalAssignUserVisible = useBoolean();
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.task);
  const [task, setTask] = useState(tasks);
  const [taskUser, setTaskUser] = useState("");

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedId, setId] = useState("");
  const [taskData, setTaskData] = useState<ITask | null>(null);

  const projectDelete = () => {
    setLoadingBtn(true);
    if (id) {
      AdminTaskAPI.deleteTask(id, selectedId)
        .then(() => {
          notification.success({ message: "successfully deleted" });
          isDeleteModalVisible.onFalse();

          dispatch(fetchTasks({ projectId: id }));
        })
        .finally(() => {
          setId("");
          setLoadingBtn(false);
        });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTasks({ projectId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setTask(tasks);
  }, [tasks]);

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as TaskStatus;
    const destinationStatus = destination.droppableId as TaskStatus;

    const sourceTasks = Array.from(tasks[sourceStatus]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    const destinationTasks = Array.from(tasks[destinationStatus]);

    const updatedTask = { ...movedTask, status: destinationStatus };

    destinationTasks.splice(destination.index, 0, updatedTask);
    setTask({
      ...tasks,
      [sourceStatus]: sourceTasks,
      [destinationStatus]: destinationTasks,
    });

    if (id) {
      AdminTaskAPI.updateTask(id, updatedTask.id, updatedTask)
        .then(() => {
          notification.success({
            message: "Task updated successfully!",
          });
        })
        .catch(() => {
          destinationTasks.splice(destination.index, 1);
          sourceTasks.splice(source.index, 0, movedTask);

          setTask({
            ...tasks,
            [sourceStatus]: sourceTasks,
            [destinationStatus]: destinationTasks,
          });

          notification.error({
            message: "Failed to update task. Reverting changes.",
          });
        })
        .finally(() => {
          dispatch(fetchTasks({ projectId: id }));
        });
    }
  };

  const { task: selectedTasks, subtasks } = useSelector(
    (state: RootState) => state.taskDetails
  );
  const { comments } = useSelector((state: RootState) => state.comments);

  const handleTaskClick = useCallback(
    async (task: ITask) => {
      dispatch(
        fetchTaskDetails({ projectId: task?.project_id, taskId: task.id })
      )
        .then(() => {
          isModalAssignVisible.onTrue();
          dispatch(
            fetchComments({ projectId: task.project_id, taskId: task.id })
          );
        })
        .catch(() => {
          notification.error({ message: "Failed to fetch task details." });
        });
      setSelectedTask(task);
    },

    [dispatch, isModalAssignVisible]
  );

  const handleAddComment = useCallback(
    async (newComment: string, parentId: string | null = null) => {
      if (newComment.trim() && selectedTask) {
        await dispatch(
          addComment({
            projectId: selectedTask.project_id,
            taskId: selectedTask.id,
            content: newComment,
            parentId,
          })
        ).then(() => {
          dispatch(
            fetchComments({
              projectId: selectedTask.project_id,
              taskId: selectedTask.id,
            })
          );
        });
      } else {
        notification.error({ message: "Comment cannot be empty" });
      }
    },
    [dispatch, selectedTask]
  );

  return (
    <div>
      <Space className="flex justify-end w-full mb-3">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={isModalCreateVisible.onTrue}
        >
          Add Task
        </Button>
      </Space>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-7 p-4 bg-gray-200 min-w-screen min-h-screen">
          {Object.values(TaskStatus).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full sm:w-1/5 bg-white shadow-md rounded-lg p-4"
                >
                  <Alert
                    message={status}
                    className={`mb-2 p-2 rounded ${statusColors[status]} flex justify-center items-center border-none`}
                    type="info"
                    showIcon={false}
                  />

                  {task[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleTaskClick(task)}
                          className={`relative border rounded-md p-3 my-2 shadow transition-all hover:shadow-lg cursor-pointer ${
                            statusColors[task.status]
                          }`}
                        >
                          <h4 className="font-semibold">{task.name}</h4>
                          <p className="text-gray-600">
                            {new Date(task.created_at).toLocaleString()}
                          </p>

                          <div className="absolute bottom-0 left-0 right-0  p-2 mt-4 text-right bg-gray-100 opacity-0 hover:opacity-100 transition-opacity">
                            <Space>
                              <DeleteButton
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  isDeleteModalVisible.onTrue();
                                  setId(task.id);
                                }}
                              />
                              <Button
                                icon={<EditOutlined />}
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  isModalUpdateVisible.onTrue();
                                  setTaskData(task);
                                }}
                              />
                              {user?.role === "admin" && (
                                <Button
                                  icon={<UserAddOutlined />}
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    isModalAssignUserVisible.onTrue();
                                    setTaskUser(task.id);
                                  }}
                                />
                              )}{" "}
                            </Space>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {isModalAssignVisible.value && (
        <TaskDetailsModal
          visible={isModalAssignVisible.value}
          onClose={isModalAssignVisible.onFalse}
          selectedTask={selectedTasks}
          subtasks={subtasks}
          comments={comments}
          onAddComment={handleAddComment}
        />
      )}
      {isModalCreateVisible.value && (
        <CreateTaskModal
          projectId={id}
          visible={isModalCreateVisible.value}
          onClose={isModalCreateVisible.onFalse}
        />
      )}
      {isDeleteModalVisible.value && (
        <CustomModal
          click={projectDelete}
          title="Delete Task"
          subTitle="Are you sure you want to task?"
          loading={loadingBtn}
          visible={isDeleteModalVisible.value}
          onClose={isDeleteModalVisible.onFalse}
        />
      )}

      {isModalUpdateVisible.value && (
        <UpdateTaskModal
          task={taskData}
          projectId={id}
          visible={isModalUpdateVisible.value}
          onClose={isModalUpdateVisible.onFalse}
        />
      )}

      {isModalAssignUserVisible.value && (
        <AssignTaskModal
          taskId={taskUser}
          projectId={id}
          visible={isModalAssignUserVisible.value}
          onClose={isModalAssignUserVisible.onFalse}
        />
      )}
    </div>
  );
};

export default TaskBoard;
