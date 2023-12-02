import React, { useState } from "react";
import styles from "./Header.module.css";
import logo from "./Assets/TL_Logo.png";
import searchIcon from "./Assets/search.svg";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import lodash from "lodash";
import { UserOutlined, ExperimentOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Dropdown, message, Tabs } from 'antd';
import IssuedItemLogs from "../LogPortal/IssuedItemLogs";
import PendingLogs from "../LogPortal/PendingLogs";
import { useSelector } from "react-redux";
lodash.startCase(String);

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  let location = useLocation();
  var x = location.pathname.slice(1);
  var str = lodash.startCase(x);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = user.user.user.name;
  const role = user.user.user.roles.role;
  // console.log(x);

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    
  };

  const items = [
    {
      label: 'Manage Users',
      key: '1',
      icon: <UserOutlined />,
      disabled: role==="HOD"?false:true,
      onClick: () => {
        navigate("/manageUsers");
      }
    },
    {
      label: 'View Labs',
      key: '3',
      icon: <ExperimentOutlined />,
      onClick: () => {
        navigate("/manageLabs");
      }
    },
    {
      label: 'Add Labs',
      key: '4',
      icon: <AppstoreAddOutlined />,
      disabled: role==="HOD"?false:true,
      danger: true,
      onClick: () => {
        navigate("/addLab");
      }
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const tabs = [
    {
      key: '1',
      label: 'Approved',
      children: <IssuedItemLogs />,
    },
    {
      key: '2',
      label: 'Pending',
      children: <PendingLogs />,
    },
  ]

  const onChange = (key) => {
    console.log(key);
  }

  return (
    <>
      <Sidebar />
      <div className={styles.header}>
        <div className={styles.headContainer}>
          {/* <div className="space"></div> */}
          <h1>{str}</h1>
          <div className={styles.logo}>
            <a href="https://tinkeringlab.iitr.ac.in/" target={"_blank"}>
              <img
                className={styles.imgLogo}
                src={logo}
                alt="tinkering lab website"
              />
            </a>
          </div>
        </div>
      </div>
      {x == "logsPortal" ? 
      (
        <Tabs defaultActiveKey="1" centered items={tabs} onChange={onChange}>
          
        </Tabs>
      )
      : (
        <div className={styles.searchCont}>
          {x === "dashboard" ?  (

            <div className={styles.search}>
            <form>
              <input
                type="text"
                placeholder="Search By Item Name"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                />
              <button type="submit">
                <img className={styles.searchIcon} alt="" src={searchIcon} />
              </button>
            </form>
          </div>
                ): null}
          <div className={styles.userBtn}>
            <Dropdown.Button onClick={() => navigate("/profile")} size="large" menu={menuProps} placement="bottom" icon={<UserOutlined />}>
              {userName}
            </Dropdown.Button>
          </div>
          {/* <div>
          <button
            className="btn-add"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Issue+
          </button>

          {modalOpen && <Modal setOpenModal={setModalOpen} index={1} />}
        </div> */}
        </div>
      )}

      <Outlet context={[query, setQuery]} />
    </>
  );
};

export default Header;
