import auth from "./slices/auth";
import profile from "./slices/profile";
import project from "./slices/project";
import task from "./slices/task";
import userProject from "./slices/user-project";
import users from "./slices/users";
import taskDetails from "./slices/task-details";
import comments from "./slices/comments";

const rootReducer = {
    auth,
    project,
    users,
    userProject,
    profile,
    task,
    taskDetails,
    comments
};
export default rootReducer;
