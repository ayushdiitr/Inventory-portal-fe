import React, { useState } from "react";
import styles from "./AddButton.module.css";
import Modal from "./../Modal/Modal";

function AddButton () {


    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.App}>
      <button
        className={styles.addButton}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        ADD+
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}


export default AddButton