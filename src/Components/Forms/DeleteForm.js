import React, { useState } from "react";
import InputBox from "../../HelperComponents/InputBox/InputBox";
import api from "../../https/api";
import styles from "./Form.module.css";
import { useCookies } from "react-cookie";
import { get } from "lodash";
import { notification } from "antd";

const DeleteForm = ({ itemData = {}, handleModal }) => {
  const [apis, contextHolder] = notification.useNotification();

  const errorNotification = (type) => {
    apis[type]({
      message: "Error",
      description: "Oops! Item could not be added",
    });
  };
  const openNotificationWithIcon = (type) => {
    apis[type]({
      message: "Success",
      description: "Item added successfully",
    });
  };
  const [cookie] = useCookies();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`app/v1/item/deleteitem/${itemData._id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      openNotificationWithIcon("success");
    } catch (err) {
      errorNotification("error");
      console.log(err);
    }
    setTimeout(handleModal, 500);
  };

  return (
    <>
      <form className={styles.form}>
        <h2 style={{ color: "#000" }}>
          Are you sure want to delete {itemData.itemName}?
        </h2>

        {/* <div className={styles.container}>
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
            value={quantity}
          />
        </div> */}
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          type={"submit"}
        >
          Delete
        </button>
      </form>
    </>
  );
};

export default DeleteForm;
