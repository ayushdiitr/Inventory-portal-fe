import moment from "moment";

const dateConverter = (date) => {
  if (moment(date).isValid() === true) {
    return moment(date).format("DD-MM-YYYY");
  } else {
    return null;
  }
};
export default dateConverter;
