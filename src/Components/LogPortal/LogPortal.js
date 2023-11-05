import React, { useEffect, useState } from "react";
// import Table from "./Table/Table";
import { Outlet } from "react-router-dom";
import api from "../../https/api";
import { useCookies } from "react-cookie";
import _, { get, sortBy } from "lodash";
import columns from "./Table/columns";
import { Table } from "antd";
import ItemForm from "../Forms/ItemForm";
import Modal from "../../HelperComponents/Modal/Modal";

const LogPortal = () => {
  const [cookie] = useCookies();
  const [logsData, setLogsData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await api.get("/app/v1/logs/getitems", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      setLogsData(get(data, "data.data").reverse());
    })();
  }, [trigger]);

  const handleClick = (data) => {
    setTrigger(data);
  };
  return (
    <div>
      <Table columns={columns(handleClick)} dataSource={logsData} />
      <Outlet />
    </div>
  );
};

export default LogPortal;
