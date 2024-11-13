import { useEffect, useState } from "react";
import useApi from "../apiService/useApi";
import { toast } from "react-hot-toast";

const useCheckInOut = () => {
  const { callApi } = useApi();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [totalTime, setTotalTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState(null);

  // Fetch and update check-in status from localStorage
  useEffect(() => {
    const savedCheckIn = localStorage.getItem("checkin");
    if (savedCheckIn) {
      setIsCheckedIn(true);
      setStartTime(new Date(savedCheckIn));
    }
  }, []);

  // Update current time every second if checked in
  useEffect(() => {
    let intervalId;
    if (isCheckedIn) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isCheckedIn]);

  // Calculate total working hours
  useEffect(() => {
    if (isCheckedIn && startTime && currentTime) {
      const diff = Math.floor((currentTime - startTime) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTotalTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }
  }, [isCheckedIn, startTime, currentTime]);

  // Handle check-in and check-out with backend API
  const handleCheckInOut = async () => {
    try {
      if (!isCheckedIn) {
        // Check-in API call
        const response = await callApi("post", "/attendance/checkin/", {});
        if (response?.checkIn) {
          const checkInTime = new Date(response.checkIn);
          setStartTime(checkInTime);
          localStorage.setItem("checkin", checkInTime);

          localStorage.setItem("checkinId", response._id);
          toast.success("Check-in successful!");
          setIsCheckedIn(true);
        }
      } else {
        // Check-out API call
        const checkInId = localStorage.getItem("checkinId");
        const response = await callApi(
          "patch",
          `/attendance/checkout/${checkInId}`,
          {}
        );
        if (response?.checkOut) {
          const checkOutTime = new Date(response.checkOut);
          setEndTime(checkOutTime);
          localStorage.removeItem("checkin");
          toast.success("Check-out successful!");
          setIsCheckedIn(false);
        }
      }
    } catch (error) {
      console.error("Error in check-in/out:", error);
      toast.error("Error in processing check-in/out.");
    }
  };

  return {
    isCheckedIn,
    totalTime,
    startTime,
    endTime,
    handleCheckInOut,
  };
};

export default useCheckInOut;
