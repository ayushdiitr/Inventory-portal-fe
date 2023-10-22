import React, { useState } from "react";
import api from "../../https/api";
import styles from "./Form.module.css";
import { useCookies } from "react-cookie";
import { get } from "lodash";
import { Space, notification } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { MinusCircleTwoTone } from "@ant-design/icons";

const UpdateForm = ({ itemData, handleModal }) => {
  const [quantity, setQuantity] = useState(0);
  const [apis, contextHolder] = notification.useNotification();
  const [cookie] = useCookies();

  const errorNotification = (type) => {
    apis[type]({
      message: "Update failed",
      description: "Oops! Item could not be updated",
    });
  };
  const successNotification = (type) => {
    apis[type]({
      message: "Updated",
      description: "Item updated successfully",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        quantity,
      };
      console.log(data.quantity);
      await api.post(
        `app/v1/item/update/${get(itemData, "_id")}/${data.quantity}`, null,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      successNotification("success");
    } catch (err) {
      errorNotification("error");
      console.log(err);
    }
    setTimeout(handleModal, 500);
  };
  const Add = () => {
    // console.log('add');
    const value = quantity + 1;
    setQuantity(value);
    // console.log(setQuantity);
  };

  const Minus = () => {
    setQuantity(quantity - 1);
  };
  // console.log('min');

  return (
    <>
      <form className={styles.form}>
        {contextHolder}
        <div className={styles.container}>
          <br />
          <p> Enter Item Quantity </p>

          {/* <div> */}
          {/* </div> */}
          {/* <InputBox
          name={"name"}
          // disabled={true}
          placeholder={"Enter Item Name"}
          type={"text"}
          // value={data.itemName}
        /> */}
        </div>
        <Space direction="column">
          <Space wrap>
            <MinusCircleTwoTone onClick={Minus} style={{ fontSize: "30px" }} />

            <div className={styles.container}>
              <input
                style={{ width: "80%", padding: "0px 10px", margin: "10px" }}
                name={"quantity"}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={"Enter Quantity"}
                type={"number"}
                value={quantity}
              />
            </div>
            <PlusCircleTwoTone onClick={Add} style={{ fontSize: "30px" }} />
          </Space>
        </Space>
        <div className={styles.btnCont}>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            type={"submit"}
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateForm;
