import React, { useEffect } from "react";
import { useState } from "react";
import InputBox from "../../HelperComponents/InputBox/InputBox";
import api from "../../https/api";
import styles from "./Form.module.css";
import { useCookies } from "react-cookie";
import Modal from "../../HelperComponents/Modal/Modal";
import { get } from "lodash";
import Loader from "../../HelperComponents/Loader/Loader";
import { Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ItemForm = ({ itemData, handleModal }) => {
  const options = [
    {
      label: "Issuable",
      value: "issuable",
    },
    {
      label: "Consumables",
      value: "consumables",
    },
    {
      label: "Minor Asset",
      value: "minor",
    },
    {
      label: "Major Asset",
      value: "major",
    },
  ];
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState(get(itemData, "itemName", ""));
  const [quantity, setQuantity] = useState(get(itemData, "quantity", 0));
  const [itemType, setItemType] = useState(
    get(itemData, "itemType", "issuable")
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [limit, setLimit] = useState(get(itemData, "limit", null));
  const [units, setUnits] = useState(get(itemData, "unit", "units"));
  const [apis, contextHolder] = notification.useNotification();
  const {user} = useSelector((state)=>state.user)
  const [labs, setLabs] = useState([]);
  const [labType, setLabType] = useState()

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        itemName,
        quantity,
        itemType,
        limit,
        unit: units,
        lab: labType,
        owners:new Map([
          [user.user._id,quantity]
        ])
      };
      if (itemData) {
        await api.post(`app/v1/item/updateitem/${get(itemData, "_id")}`, data, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
      } else {
        await api.post("app/v1/item/additem", data, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        });
        navigate("/dashboard");
      }

      openNotificationWithIcon("success");
      // {handleModal()}
      // setModalOpen(true);
    } catch (err) {
      // {handleModal}
      errorNotification("error");
      console.log(err);
    }
    setTimeout(handleModal, 500);
    setLoading(false);
  };

  useEffect(() => {
    (async() => {
      const labData = await api.get("app/v1/lab/getLabs");
      setLabs(labData.data.data);
    })()
  },[])

  return (
    <form className={styles.form}>
      {contextHolder}
      <div className={styles.container}>
        <InputBox
          name={"itemName"}
          onChange={(e) => setItemName(e.target.value)}
          placeholder={"Enter Item Name"}
          value={itemName}
          type={"text"}
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
      </div>
      <div className={styles.container}>
        <InputBox
          name={"units"}
          onChange={(e) => setUnits(e.target.value)}
          placeholder={"Enter Unit"}
          type={"text"}
          value={units}
        />
      </div>
      <div className={styles.container}>
        <InputBox
          name={"limit"}
          onChange={(e) => setLimit(e.target.value)}
          placeholder={"Enter Limit"}
          type={"number"}
          value={limit}
        />
      </div>
      <div className={styles.select}>
        <select
          name="itemType"
          className={styles.item}
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        >
          {options.map((data) => {
            return <option value={data.value}>{data.label}</option>;
          })}
        </select>
      </div>
      {/* Labs */}
      <div className={styles.select}>
        <select
          name="Lab"
          className={styles.item}
          placeholder="Select Lab"
          value={labType}
          onChange={(e) => setLabType(e.target.value)}
        >
          {console.log(labType, "labType")}
          {labs.map((data) => {
              return (
                <>
                <option value="" disabled selected hidden>Select Lab</option>
                <option value={data._id}>{data.name}</option> 
                </>
                )
          })}
        </select>
      </div>
      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        type={"submit"}
      >
        Continue
      </button>
    </form>
  );
};

export default ItemForm;
