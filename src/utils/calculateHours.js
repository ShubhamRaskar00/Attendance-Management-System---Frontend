import moment from "moment";

const calculateHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return "N/A";
  const start = moment(checkIn);
  const end = moment(checkOut);
  const diffMs = end - start;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}`;
};

export default calculateHours;
