import moment from "moment";

const calculateProgress = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return "0%"
  }

  const start = moment(checkIn);
  const end = moment(checkOut);
  const diffMs = end - start;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const totalHours = hours + minutes / 60;

  const targetHours = 10;
  const progress = Math.min(Math.round((totalHours / targetHours) * 100), 100);

  return `${progress}%`
  
};

export default calculateProgress;
