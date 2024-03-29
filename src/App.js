/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import LogPortal from "./Components/LogPortal/LogPortal";
import Admin from "./Components/Admin/Admin";
import { useCookies } from "react-cookie";
import api from "./https/api";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./store/authSlice";
import 'antd/dist/reset.css';
import Modal from "./HelperComponents/Modal/Modal";
import ManageUsers from "./Components/Profile/UsersPage";
import ManageItems from "./Components/Profile/ItemsPage";
import AddLab from "./Components/Profile/AddLab";
import ProfilePage from "./Components/Profile/UserPage";
import ItemPage from "./Components/ItemPage";
import Callback from "./Components/Admin/Callback";

function App() {
  const [cookie] = useCookies();
  const dispach = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { open } = useSelector(state => state.modal);
  console.log(user);
  useEffect(() => {
    (async () => {
      if (cookie.token) {
        const data = await api.get("/app/v1/auth/refresh", {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        dispach(
          setAuth({
            user: data.data.data,
          })
        );
      }
    })();
  }, []);

  return (
    <>
      {
        open ? <Modal /> : null
      }
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Header /> : <Navigate to="/login" />}
          >
            <Route index element={<Dashboard user={user} />} />
            <Route element={<Dashboard user={user} />} path="dashboard" />
            <Route element={<LogPortal />} path="logsPortal" />
            <Route element={<ManageUsers />} path="/manageUsers" />
            <Route element={<ManageItems />} path="/managelabs" />
            <Route element={<AddLab />} path="/addLab" />
            <Route element={<ProfilePage user={user} />} path="/profile" />
          </Route>
          <Route element={<ItemPage />} path="/item/:id" />
          <Route
            element={!isAuth ? <Admin /> : <Navigate to="/dashboard" />}
            path="/login"
          />
          <Route
            element={<Callback />}
            path="/home"
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
