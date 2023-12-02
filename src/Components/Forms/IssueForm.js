import React, { useEffect } from "react";
import { useState } from "react";
import InputBox from "../../HelperComponents/InputBox/InputBox";
import api from "../../https/api";
import styles from "./Form.module.css";
import { get, set, values } from "lodash";
import { useSelector } from "react-redux";
import Modal from "./../../HelperComponents/Modal/Modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Select, Tooltip, notification } from "antd";

const IssueForm = ({ itemData, handleModal }) => {
  const [cookie] = useCookies();
  const user = useSelector((state) => state.user);
  const issuer = user.user.user._id;
  const item = get(itemData, "_id");
  const [quantity, setQuantity] = useState(get(itemData, "quantity", 0));
  const [holderEmail, setHolderEmail] = useState();
  const [holderName, setHolderName] = useState();
  const [issueDate, setIssueDate] = useState(
    moment(Date.now()).format("yyyy-MM-DD")
  );
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState(9999999999);
  const [apis, contextHolder] = notification.useNotification();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const errorNotification = (type) => {
    apis[type]({
      message: "Error",
      description: "Oops! Item could not be issued.",
    });
  };
  const openNotificationWithIcon = (type) => {
    apis[type]({
      message: "Success",
      description: "Item Issued successfully.",
    });
  };
// console.log(holderName);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        item,
        quantity,
        issuedFrom : {issuer: user.user.user.name, labName:''},
        holderName: holderName,
        dateOfIssue : issueDate,
        projectName,
        description,
        contactNumber,
        issuedFromEmail : user.user.user.email,
        issuedToEmail : holderEmail,
      };

      await api.post(
        "/app/v1/logs/issueitem/" + data.item + "/" + data.quantity,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      openNotificationWithIcon("success");
    } catch (err) {
      console.log(err);
      errorNotification("error");
    }
    setTimeout(handleModal, 500);
  };

  const changeHolderName = (e) => {
    // console.log(holderName, holderEmail);
    setHolderEmail(e.target.value);
    setHolderName(e.target.selectedOptions[0].label);
  }

  const onSearch = (e) => {
    setQuery(e);
  }

  useEffect(() => {
    (async() => {
      console.log(query, "query");
      try {
        const response = await api.post("/app/v1/auth/searchUsers", {
          query: query, 
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        console.log(response.data.data.users, "response");
        setUsers(response.data.data.users);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [query])

  const options=() => {
     users.map((data) => {
      return {value: data.name, label: data.name, email: data.email};
    })  
  }

  return (
    <form className={styles.form}>
      {contextHolder}
      <div className={styles.container}>
        <InputBox
          name={"name"}
          disabled={true}
          placeholder={"Enter Item Name"}
          type={"text"}
          value={itemData.itemName}
        />
      </div>
      <div className={styles.container}>
        <InputBox
          name={"quantity"}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={"Enter Quantity"}
          type={"number"}
          max={itemData.limit}
        />
      </div>
      <div >
        {/* <InputBox
          name={"holderName"}
          onChange={changeHolderName}
          placeholder={"Enter Holder's Name"}
          type={"text"}
        /> */}
        <div className={styles.select}>
        <select
          name="holderName"
          className={styles.item}
          value={holderEmail}
          onChange={changeHolderName}
         >
          {users.map((data) => {
            return (
              <>
              <option value="" disabled selected hidden>Select User</option>
             <option key={data.name} value={data.email}>{data.name}</option>
             {/* // <option value={data.name}>{data.name}</option>; */}
              </>
            )
          })}
        </select>
      </div>
      </div>
      <div className={styles.container}>
        <InputBox
          name={"issueDate"}
          inputStyle={{ padding: "0 12px" }}
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          placeholder={"Enter Issue Date"}
          type={"date"}
        />
      </div>
      <div className={styles.container}>
        <InputBox
          name={"projectName"}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder={"Enter Project Name"}
          type={"text"}
        />
      </div>
      <div className={styles.container}>
        <InputBox
          name={"description"}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Enter Description"}
          type={"text"}
        />
      </div>
      <div className={styles.container}>
        <InputBox
          name={"contactNumber"}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder={"Enter Contact Number"}
          type={"number"}
        />
      </div>
      <input
        className={styles.submitBtn}
        onClick={handleSubmit}
        type={"submit"}
        placeholder={"Continue"}
      />
      {/* {modalOpen && <Modal setOpenModal={setModalOpen} index={4} />} */}
    </form>
  );
};

export default IssueForm;
