import React, { useState, useEffect } from "react";
import styles from "./IssueButton.module.css";
import Modal from "../Modal/Modal";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import { get } from "lodash";

const IssueButton = ({ onClick, data, index, disabled, name }) => {
  // var str;
  // if (index === 0 ){
  //   str = styles.greyIssueButton;
  // }
  // else if (index === 1) {
  //   str = styles.greenIssueButton;
  // }
  const [modalOpen, setModalOpen] = useState(false);
  const [cookie] = useCookies();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setItemData(data);
  }, [data]);

  return (
    <div>
      <div>
        {index === 1 ? (
          <button
            onClick = {{onClick}}
            className={styles.greenIssueButton}
          >
            {name}
          </button>
        ) : index === 0 ? (
          <button disabled={true} className={styles.greyIssueButton}>
            {name}
          </button>
        ) : (
          <button />
        )}
      </div>
      {/* {modalOpen && (
        <Modal setOpenModal={setModalOpen} index={1} data={itemData} />
      )} */}
    </div>
  );
};

export default IssueButton;
