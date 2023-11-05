import React from 'react'
import InputBox from "../../HelperComponents/InputBox/InputBox";
import styles from "./Form.module.css";
import { useState } from 'react';
import { useSelector } from "react-redux";

const AddUserForm = ({ handleModal }) => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [designation, setDesignation] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [role, setRole] = useState();

  const options = [
    {
      label: "User",
      value: "User",
    },
    {
      label: "Lab Admin",
      value: "Lab Admin",
    },
    {
      label: "Staff",
      value: "Staff",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName)
  }
  const user = useSelector((state) => state.user);
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.container}>
          <InputBox name={"User Id"}
            onChange={(e) => setUserId(e.target.value)}
            placeholder={"Enter User Id"}
            value={userId}
            type={"number"} />
          <InputBox
            name={"User Name"}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"Enter Item Name"}
            value={userName}
            type={"text"}
          />
          <InputBox name={"email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter Email"}
            value={email}
            type={"text"} />
          <InputBox name={"password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter Password"}
            value={password}
            type={"password"} />
          <InputBox name={"designation"}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder={"Enter Designation"}
            value={designation}
            type={"text"} />
          <InputBox name={"contactNumber"}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder={"Enter Contact Number"}
            value={contactNumber}
            type={"number"} />
          <InputBox name={"Department"}
            disabled={true}
            value={user.user.user.department.name} />
          <div className={styles.select}>
            <select
              name="role"
              className={styles.item}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {options.map((data) => {
                return <option value={data.value}>{data.label}</option>;
              })}
            </select>
          </div>


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