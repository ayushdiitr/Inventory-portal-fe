import React, { useEffect, useState } from "react";
import styles from "./ReturnButton.module.css";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import { get } from "lodash";
import Modal from "../Modal/Modal";
import { notification } from "antd";
import Loader from "../Loader/Loader";
import ReturnForm from "../../Components/Forms/ReturnForm";

const ReturnButton = ({
  id,
  index,
  itemType = "issuable",
  handleClick = () => {},
}) => {
  var str;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  if (itemType === "consumables") {
    str = styles.greyReturnButton;
  } else {
    if (!index) {
      str = styles.greyReturnButton;
    } else {
      str = styles.redReturnButton;
    }
  }
  const [cookie] = useCookies();
  const [apis, contextHolder] = notification.useNotification();

  const errorNotification = (type) => {
    apis[type]({
      message: "Update failed",
      description: "Oops! Item could not be updated",
    });
  };

  const infoNotification = (type) => {
    apis[type]({
      message: "Item Returned",
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      await api.post("app/v1/logs/return/" + id, null, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      // setModalOpen(true);
      handleClick(!modalOpen);
      infoNotification("info");
    } catch (err) {
      errorNotification("error");
      console.log(err);
    }
    setLoading(false);
    setModalOpen(false);
  };
  
  const handleTransfer = async (newLabId) => {
    console.log(newLabId, "newLabId");
    setLoading(true);
    try {
      await api.post("app/v1/logs/transfer/" + id, {newLabId:newLabId}, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      // setModalOpen(true);
      handleClick(!modalOpen);
      infoNotification("info");
    } catch (err) {
      errorNotification("error");
      console.log(err);
    }
    setLoading(false);
    setModalOpen(false);
  };
  const handleReturn = () => {
    setModalOpen(true);
  }

  const handleModal = () => {
    setModalOpen(false);
  }
  
  useEffect(() => {}, [modalOpen]);
  const comp = <ReturnForm handleModal={handleModal} handleSubmit={handleSubmit} handleTransfer={handleTransfer} />
  return (
    <>
      {contextHolder}
      {loading ? (
        <button className={str}>
          <Loader />
        </button>
      ) : (
        <div>
          {index === 0 ? (
            <button className={str}>RETURN</button>
          ) : (
            <button disabled={!index} onClick={handleReturn} className={str}>
              RETURN
            </button>
          )}
          {modalOpen && <Modal header={"Return/Transfer"} setOpenModal={setModalOpen} component={comp} />}
          {/* {modalOpen && <Modal setOpenModal={setModalOpen} index={2} />} */}
          {/* {modalOpen && <Modal setOpenModal={setModalOpen} header="Item Returned Successfully" />} */}
        </div>
      )}
    </>
  );
};

export default ReturnButton;
