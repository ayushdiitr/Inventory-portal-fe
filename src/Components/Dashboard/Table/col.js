import lodash from "lodash";
import AvailableButton from "../../../HelperComponents/AvailableButton/AvailableButton";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import plusminus from "./asset/icon.svg";
import { Typography, Divider } from "antd";

var qty;
var qtyFlag;
const columns = (handleClick = () => { }) => [
  {
    title: "ITEM NAME",
    dataIndex: "itemName",
    key: "itemName",
    // sorter: (a, b) => a.itemName.length - b.itemName.length,
    render: (data, val) => {
      return <Typography.Link target="_blank" href={`item/${val._id}`}>{data}</Typography.Link>;
    }
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
  // {
  //   title: "ADD/ REMOVE STOCK",
  //   dataIndex: "_id",
  //   render: (data, r) => {
  //     return (
  //       <div onClick={() => handleClick(r, "update")} style={{ width: "50px", marginLeft: "5vw", cursor: "pointer" }}>
  //         <img src={plusminus} style={{ width: "24px" }} />
  //       </div>
  //     );
  //   },
  // },
  {
    title: "ACTIONS",
    dataIndex: "_id",
    render: (data, r) => {
      return (
        <div style={{display:"flex", justifyContent:'space-evenly'}}>
          <Typography.Link>
            <EditOutlined
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => handleClick(r, "edit")}
            />
          </Typography.Link>
          <Divider type="vertical" />
          <Typography.Link>
          <span onClick={() => handleClick(r, "update")} style={{  cursor: "pointer" }}>
          <img alt="change quantity icon" src={plusminus} style={{ width: "22px" }} />
        </span>
          </Typography.Link>
          <Divider type="vertical" />
          <Typography.Link type="danger">
            <DeleteOutlined
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => handleClick(r, "delete")}
            />
          </Typography.Link>
        </div>
      );
    },
  },
  // {
  //   title: "DELETE",
  //   dataIndex: "_id",
  //   render: (data, r) => {
  //     return (
  //     );
  //   },
  // },
];

export default columns;
