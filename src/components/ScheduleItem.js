import React from "react";
// reactstrap components
import { Button } from "reactstrap";

const ScheduleItem = (props) => {
  const { title, date, month, time, details, partner, icon } = props;
  return (
    <>
      <Button className="schedule-item" color="light" outline type="button">
        <div className="activity bold border-bottom">{title}</div>
        <div className="flex-spread border-bottom">
          <div className="flex-left">
            <div className="date">{date}</div>
            <div className="month bold">{month}</div>
          </div>
          <div className="time">{time}</div>
        </div>
        <p className="details">{details}</p>
        <div className="logo-container">
          <img src={icon} className="logo" alt={partner} />
        </div>
        {/* <div className="partner">/ {partner}</div> */}
      </Button>
    </>
  );
};

export default ScheduleItem;
