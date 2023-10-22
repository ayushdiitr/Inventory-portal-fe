import React from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import styles from "./Modal.module.css";
import IssueForm from "../../Components/Forms/IssueForm";
import ItemForm from "../../Components/Forms/ItemForm";
import StatusModal from "../StatusModal/StatusModal.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Modal({ setOpenModal, index, data, header, component }) {

  // const { header, component } = useSelector(state => state.modal);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpenModal(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <>
      <div
        className={styles.modalBackground}
        onClick={() => setOpenModal(false)}
      ></div>
      <div className={styles.modalContainer} >
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          {
            header
          }
          {/* {index === 0 ? (
            <h3>ADD NEW ITEM</h3>
          ) : index === 1 ? (
            <h3>ISSUE FORM</h3>
          ) : index === 2 ? (
            <h3> </h3>
          ) : index === 3 ? (
            <h3></h3>
          ) : index === 4 ? (
            <h3>UPDATE NEW ITEM</h3>
          ) : (
            <h3></h3>
          )} */}
        </div>
        <div className={styles.body}>
          {component}
          {/* {index === 0 ? (
            <ItemForm itemData={data} />
          ) : index === 1 ? (
            <IssueForm data={data} />
          ) : index === 2 ? (
            <StatusModal index={2} />
          ) : index === 3 ? (
            <StatusModal index={0} />
          ) : index === 4 ? (
            <StatusModal index={1} />
          ) : (
            <Dashboard />
          )} */}
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
}

export default Modal;
