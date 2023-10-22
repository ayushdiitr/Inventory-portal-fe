import React, { useState } from "react";
import styles from "./Header.module.css";
import logo from "./Assets/TL_Logo.png";
import searchIcon from "./Assets/search.svg";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Modal from "../../HelperComponents/Modal/Modal";
import { useLocation } from "react-router-dom";
import lodash from "lodash";
lodash.startCase(String);

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  let location = useLocation();
  var x = location.pathname.slice(1);
  var str = lodash.startCase(x);
  // console.log(x);

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
      {x == "logsPortal" ? null : (
        <div className={styles.searchCont}>
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
