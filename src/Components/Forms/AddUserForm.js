import React, { useEffect } from 'react'
import InputBox from "../../HelperComponents/InputBox/InputBox";
import styles from "./Form.module.css";
import { useState } from 'react';
import { useSelector } from "react-redux";
import api from '../../https/api';

const AddUserForm = ({ handleModal }) => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [designation, setDesignation] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [role, setRole] = useState("User");
  const [loading,setLoading] = useState(false);
  const [lab, setLab] = useState();
  const [labList, setLabList] = useState([]);
  const user = useSelector((state) => state.user);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await api.post("app/v1/auth/addUser", {
        name: userName,
        userId: userId,
        email: email,
        password: password,
        passwordConfirm: password,
        designation: designation,
        contactNumber: contactNumber,
        roles: {
          role: role,
          lab: lab,
        },
        department:user.user.user.department._id,
      });
      console.log(res, "test user modal")
      if (res.status === 200) {
        console.log("success");
        setLoading(false);
        // handleModal();
      
    }}catch(err){
      console.log(err)
    }
    setTimeout(handleModal, 1000);
    setLoading(false);
  }

  useEffect(() => {
    (async() => {
      const labs = await api.get("/app/v1/lab/getLabs");
      console.log(labs.data.data);
      setLabList(labs.data.data);
    })()
  },[])

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
            placeholder={"Enter User Name"}
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
          {/* <InputBox name={"Department"}
            disabled={true}
            value={user.user.user.department.name} /> */}
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
              {
                role ==="Lab Admin" ? (
                  <>
                  <div className={styles.select}>

                  <select name={"Lab"}
                  onChange={(e) => setLab(e.target.value)}
                  placeholder={"Enter Lab"}
                  value={lab}
                  type={"text"} >
                  {
                    labList.map((data) => {
                      return <option value={data.name}>{data.name}</option>
                    })}
                  </select>
                    </div>
                  </>
                ): (
                  null
                )
              }

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