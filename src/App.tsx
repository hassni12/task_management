import { Suspense } from "react";
import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import NotFound from "./views/not-found";
import PageLoading from "./components/page-loading";
import { ToastContainer } from "react-toastify";
import Login from "./views/login";
import Register from "./views/register";
import AppLayout from "./layouts/app-layout";
import { PathLogout } from "./components/path-logout";
import AuthGuard from "./components/auth/auth-gaurd";
import { AllRoutes } from "./routes";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          index
          path="/login"
          element={
            <PathLogout>
              <Login />
            </PathLogout>
          }
        />
        <Route
          path="/register"
          element={
            <PathLogout>
              <Register />
            </PathLogout>
          }
        />

{/* console.log(first) */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <AppLayout />
            </AuthGuard>
          }
        >
          {AllRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer
        className="antd-toast"
        position="top-right"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
};

export default App;
