import React from "react";
import { useState } from "react";
import InputBox from "../../HelperComponents/InputBox/InputBox";
import api from "../../https/api";
import styles from "./Form.module.css";
import { get } from "lodash";
import { useSelector } from "react-redux";
import Modal from "./../../HelperComponents/Modal/Modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, notification } from "antd";

const IssueForm = ({ itemData, handleModal }) => {
  const [cookie] = useCookies();
  const user = useSelector((state) => state.user);
  const issuer = user.user.user._id;
  const item = get(itemData, "_id");
  const [quantity, setQuantity] = useState(get(itemData, "quantity", 0));
  const [holderName, setHolderName] = useState();
  const [issueDate, setIssueDate] = useState(
    moment(Date.now()).format("yyyy-MM-DD")
  );
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState(9999999999);
  const [apis, contextHolder] = notification.useNotification();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        item,
        quantity,
        issuer,
        holderName,
        issueDate,
        projectName,
        description,
        contactNumber,
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
      <div className={styles.container}>
        <InputBox
          name={"holderName"}
          onChange={(e) => setHolderName(e.target.value)}
          placeholder={"Enter Holder's Name"}
          type={"text"}
        />
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
