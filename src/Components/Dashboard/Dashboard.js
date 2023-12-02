import React, { useEffect, useState } from "react";
import ItemForm from "../Forms/ItemForm";
// import Table from "./Table/Table";
import { Outlet, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import { get } from "lodash";
// import columns from "./Table/columns";
import columns from "./Table/col";
import Modal from "../../HelperComponents/Modal/Modal";
import { Input, Select, Table, message } from "antd";
import styles from "./Table/Table.module.css";
import DeleteForm from "../Forms/DeleteForm";
import IssueForm from "../Forms/IssueForm";
import UpdateForm from "../Forms/UpdateForm";


const Dashboard = ({user}) => {
  const [cookie] = useCookies();
  const [itemsData, setItemsData] = useState([]);
  const [modal, setModal] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [query, setQuery] = useOutletContext();
  const [property, setProperty] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    (async () => {
      const data = await api.get("/app/v1/item/getitems", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      console.log(data)
      setItemsData(get(data, "data.data"));
    })();
  }, [modal]);

  const search = (data) => {
    return data.filter((item) =>
      item.itemName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleClick = (data, modalType) => {
    setItemData(data);
    setModal(true);
    setProperty(modalType);
  };

  const handleModal = (e) => {
    console.log("!!");
    setModal(false);
    console.log("!!!!");
  };

  // const ItemForm = <ItemForm handleModal={handleModal} />

  // const handleDelete = (data, property) => {
  //   setItemData(data);
  //   setModal(true);
  // }

  const col = columns(handleClick);

  if(user.user.firstLogin){
    console.log("first login", user.user.firstLogin);
    const success = () => {
      messageApi.open({
        type: 'warning',
        content: 'Change your password by clicking on your name on the top right corner',
        duration: 5,
      });
    };
    success();
  }

  return (
    <div>
      {contextHolder}
      {/* {console.log(itemsData)} */}
      <Table
        className={styles.table}
        columns={col}
        dataSource={search(itemsData)}
      />
      {modal && (
        <Modal
          setOpenModal={setModal}
          header={
            property === "edit"
              ? "Edit Item Details"
              : property === "delete"
              ? "Delete Item"
              : property === "issue"
              ? "Issue Item"
              : "Update Item"
          }
          component={
            property === "edit" ? (
              <ItemForm itemData={itemData} handleModal={handleModal} />
            ) : property === "delete" ? (
              <DeleteForm itemData={itemData} handleModal={handleModal} />
            ) : property === "issue" ? (
              <IssueForm itemData={itemData} handleModal={handleModal} />
            ) : (
              <UpdateForm itemData={itemData} handleModal={handleModal} />
            )
          }
        />
      )}
      <Outlet />
    </div>
  );
};

export default Dashboard;
