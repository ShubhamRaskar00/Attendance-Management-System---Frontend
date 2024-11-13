import React from "react";
import ButtonField from "./ButtonField";
import useCheckInOut from "../hook/useCheckInOut";

function CheckInOut() {
  const { isCheckedIn, totalTime, handleCheckInOut } = useCheckInOut();

  return (
    <div className="flex justify-end checkinout-container">
      <ButtonField
        variant="contained"
        size="large"
        shape="rounded"
        loading={false}
        sx={{
          textTransform: "capitalize",
          backgroundColor: "#000",
          px: "5rem",
        }}
        onClick={handleCheckInOut}
        customClass="show-checkout"
      >
        {isCheckedIn ? (
          <div>
            <span className="checkout-btn hidden">Check Out</span>
            <span className="total-time">{totalTime}</span>
          </div>
        ) : (
          "Check In"
        )}
      </ButtonField>
    </div>
  );
}

export default CheckInOut;
