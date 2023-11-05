import React from 'react'
import InputBox from "../../HelperComponents/InputBox/InputBox";
import styles from "./Form.module.css";
import { useState } from 'react';

const AddUserForm = ({handleModal}) => {
  const [userName, setUserName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName)
  }

  return (
    <div>
        <form className={styles.form}>
      <div className={styles.container}>
        <InputBox
          name={"User Name"}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={"Enter Item Name"}
          value={userName}
          type={"text"}
        />
      </div>
     
      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        type={"submit"}
      >
        Continue
      </button>
    </form>
    </div>

  )
}

export default AddUserForm