import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {  Route,
  Routes,
  BrowserRouter as Router, } from "react-router-dom";
import NotFound from "./views/not-found";
import PageLoading from "./components/page-loading";
import { ToastContainer } from "react-toastify";
import Login from "./views/login";
import Register from "./views/register";

const App = () => {

  return (
    <Router>
        <Routes>
          <Route
            index
            path='/login'
            element={
              // <PathLogout>
                <Login />
              // </PathLogout>
            }
          />
           <Route
       
            path='/register'
            element={
              // <PathLogout>
                <Register />
              // </PathLogout>
            }
          />

          {/* <Route
            path=''
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          > */}
            {/* <Route path='/' element={<Navigate to='dashboard' />} />
            {AllRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route> */}
          <Route
            path='*'
            element={
              <Suspense fallback={<PageLoading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <ToastContainer
          className='antd-toast'
          position='top-right'
          autoClose={2500}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
        />
        {/* {loading && <PageLoading />} */}
      </Router>
  );
};

export default App;
