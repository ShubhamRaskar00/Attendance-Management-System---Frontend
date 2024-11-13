import moment from "moment";

const formatDateTime = (isoString) => {
  return moment(isoString).format("DD-MM-YYYY, hh:mm A");
};

export default formatDateTime;
