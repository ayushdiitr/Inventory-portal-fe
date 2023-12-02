import dateConverter from "../../../HelperComponents/dateConverter";
import ReturnButton from "./../../../HelperComponents/ReturnButton/ReturnButton";
import moment from "moment";
const columns = (handleClick = () => { }) => [
  {
    key: "itemName",
    title: "ITEM NAME",
    dataIndex: "_id",
    render: (id, data) => {
      return <>{data.item.itemName}</>;
    },
    sorter: (a, b) => a.item.itemName.length - b.item.itemName.length,
  },
  {
    key: "quantity",
    title: "QUANTITY",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    key: "HoldersName",
    title: "HOLDER'S NAME",
    dataIndex: "holderName",
    sorter: (a, b) => a.holderName.length - b.holderName.length,
  },
  {
    key: "issuedFrom",
    title: "ISSUED FROM",
    render: (data) => {
      return <>{data.issuedFrom.labName}</>;
    }
  },
  {
    key: "holdersNumber",
    title: "CONTACT NUMBER",
    dataIndex: "contactNumber",
  },
  {
    key: "issueData",
    title: "ISSUE DATE",
    dataIndex: "issueDate",
    render: (data) => {
      return <>{dateConverter(data)}</>;
    },
    sorter: (a, b) => moment(a.issueDate).unix() - moment(b.issueDate).unix(),
  },
  // {
  //   key: "returnDate",
  //   title: "RETURN DATE",
  //   dataIndex: "returnDate",
  //   render: (data) => {
  //     return (
  //       <>
  //         {data}
  //       </>
  //     );
  //   },
    // sorter: (a, b) => moment(a.returnDate).unix() - moment(b.returnDate).unix(),
  // },
];

export default columns;
