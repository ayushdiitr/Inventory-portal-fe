import AvailableButton from "../../../HelperComponents/AvailableButton/AvailableButton";
import IssueButton from "../../../HelperComponents/IssueButton/IssueButton";
import lodash from "lodash";
import { Button } from "antd";
import DeleteButton from "../../../HelperComponents/DeleteButton/DeleteButton";
import styles from "./Table.module.css";

var qty;
var qtyFlag;
const columns = (handleClick = () => {}) => [
  {
    Header: "ITEM NAME",
    accessor: "itemName",
    Cell: (data) => {
      return <>{lodash.startCase(data.value)}</>;
    },
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
    Cell: (data) => {
      qty = data.value;
      return <p>{qty}</p>;
    },
  },
  {
    Header: "ITEM TYPE",
    accessor: "itemType",
    Cell: (data) => {
      qty = data.value;
      return <p>{lodash.startCase(qty)}</p>;
    },
  },
  {
    Header: "STATUS",
    Cell: () => {
      if (qty === 0) {
        qtyFlag = 0;
      } else {
        qtyFlag = 1;
      }
      return <AvailableButton index={qtyFlag} />;
    },
  },
  {
    Header: "ACTION",
    accessor: (data) => {
      return data;
    },
    Cell: (data) => {
      return (
        <IssueButton
          data={data.value}
          name={data.value.itemType === "issuable" ? "ISSUE" : "PROVIDE"}
          index={qtyFlag}
        />
      );
    },
  },
  {
    Header: "ADD NEW STOCK",
    accessor: (data) => {
      return data;
    },
    Cell: (data) => {
      return (
        <div className={styles.btnCntr}>
        <Button
          style={{
            width: 110,
            fontSize: 18,
            color: "white",
            backgroundColor: "orange",
            border: "none",
            height: 40,
            borderRadius: 20,
            cursor: "pointer",
            fontFamily: "Montserrat",
            
          }}
          onClick={() => handleClick(data.value)}
          type="primary"
          >
          ADD
        </Button>
        <DeleteButton onClick={() => handleClick(data.value)} />
          </div>
      );
    },
  },
];

export default columns;
