import lodash from "lodash";
import AvailableButton from "../../../HelperComponents/AvailableButton/AvailableButton";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import plusminus from "./asset/icon.svg";

var qty;
var qtyFlag;
const columns = (handleClick = () => { }) => [
  {
    title: "ITEM NAME",
    dataIndex: "itemName",
    key: "itemName",
    sorter: (a, b) => a.itemName.length - b.itemName.length,
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
    render: (data) => {
      qty = data;
      return <>{data}</>;
    },
  },
  {
    title: "ITEM TYPE",
    dataIndex: "itemType",
    key: "itemType",
    filters: [
      {
        text: "Issuable",
        value: "issuable",
      },
      {
        text: "Consumables",
        value: "consumables",
      },
      {
        text: "Minor Asset",
        value: "minor",
      },
      {
        text: "Major Asset",
        value: "major",
      },
    ],
    onFilter: (value, record) => record.itemType.startsWith(value),
    filterMode: "tree",
    render: (data) => {
      return <div>{lodash.startCase(data)}</div>;
    },
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
    // filters: [
    //   {
    //     text: "Available",
    //     value:"",
    //   },
    //   {
    //     text: "Not Available",
    //     value: 0,
    //   }
    // ],
    // onFilter: (value, record) => record.quantity.startsWith(value),
    // filterMode: "tree",

    render: (data) => {
      // console.log(qty);
      if (data === 0) {
        qtyFlag = 0;
        // return <>Not Available</>
        return <AvailableButton index={qtyFlag} />;
      } else {
        qtyFlag = 1;
        // return <>Available</>
        return <AvailableButton index={qtyFlag} />;
      }
    },
  },
  {
    title: "ISSUE",
    dataIndex: "_id",
    render: (data, r) => {
      return (
        <>
          {/* {r.itemType === "issuable" ? ( */}
          <ShoppingCartOutlined
            data={r}
            index={qtyFlag}
            onClick={() => handleClick(r, "issue")}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </>
      );
    },
  },
  {
    title: "ADD/ REMOVE STOCK",
    dataIndex: "_id",
    render: (data, r) => {
      return (
        <div onClick={() => handleClick(r, "update")} style={{width: "50px", marginLeft: "5vw",cursor:"pointer"}}>
          <img src={plusminus} style={{width: "24px"}} />
        </div>
      );
    },
  },
  {
    title: "EDIT",
    dataIndex: "_id",
    render: (data, r) => {
      return (
        <EditOutlined
          style={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => handleClick(r, "edit")}
        />
      );
    },
  },
  {
    title: "DELETE",
    dataIndex: "_id",
    render: (data, r) => {
      return (
        <DeleteOutlined
          style={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => handleClick(r, "delete")}
        />
      );
    },
  },
];

export default columns;
