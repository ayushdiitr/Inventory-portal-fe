import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./sidebar.css";
import inventory from "./Assets/sell.svg";
import logs from "./Assets/search.svg";
import add from "./Assets/add.svg";
import Logout from "./Assets/logout.svg";
import { setLogout } from "../../store/authSlice";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Modal from "../../HelperComponents/Modal/Modal";
import { useSelector } from "react-redux";
import inventoryLogo from "./Assets/inventoryLogo.svg";
import ItemForm from "../Forms/ItemForm";
import AddUserForm from "../Forms/AddUserForm";
import { UserAddOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const userName = user.user.user.name;
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const path = window.location.pathname;

  const logout = () => {
    removeCookie("token");
    dispatch(setLogout());
    navigate("/login");
  };

  const handleModal = (e) => {
    console.log("!!");
    setModalOpen(false);
    console.log("!!!!");
  };

  const comp = <ItemForm handleModal={handleModal} />;
  const userComp = <AddUserForm handleModal={handleModal} />;
  return (
    <div className="sidebar">
      <div className="hex">
        <div className="itemCont">
          <div className="userName">
            <img className="" src={inventoryLogo} alt="" />

            <h4>{user.user.user.department.name}</h4>
          </div>
          {user.user.user.roles.role==="HOD"?(
              <button
              className={`btn-item ${modalOpen.header === "Add User" ? "btn-selected" : ""}`}
              onClick={() => {
                dispatch(
                  setModalOpen({
                    open: true,
                    header: "Add User",
                    component: <AddUserForm />,
                  })
                );
              }}
              > 
                <UserAddOutlined style={{fontSize: '24px'}} />
                <p>Add Users</p>
              </button>
          ):(
            null
          )}
          <Link to="/dashboard">
            <button
              className={`btn-item ${path === "/dashboard" ? "btn-selected" : ""
                }`}
            >
              <img src={inventory} alt=""></img>
              <p>Dashboard</p>
            </button>
          </Link>
          <Link to="/logsPortal">
            <button
              className={`btn-item ${path === "/logsPortal" ? "btn-selected" : ""
                }`}
            >
              <img src={logs} alt=""></img>
              <p>Logs portal</p>
            </button>
          </Link>
          <button
            className={`btn-item ${modalOpen.header === "Add New Item" ? "btn-selected" : ""}`}
            onClick={() => {
              dispatch(
                setModalOpen({
                  open: true,
                  header: "Add Item",
                  component: <ItemForm />,
                })
              );
            }}
          >
            <img src={add} alt=""></img>

            <p>Add new items</p>
          </button>
          {modalOpen && (
            <Modal
              setOpenModal={setModalOpen}
              header={modalOpen.header === "Add User" ? "Add User" : "Add New Item"}
              component={modalOpen.header === "Add User" ? userComp : comp}
            />
          )}
        </div>
        <div className="logout">
          <button className="btn-logout" onClick={logout}>
            <img src={Logout} alt=""></img>

            <p>log out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
