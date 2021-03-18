import React from "react";
// reactstrap components
import { Button } from "reactstrap";

const ScheduleItem = (props) => {
  const { date, month, time, details, partner } = props;
  return (
    <>
      <Button className="schedule-item" color="light" outline type="button">
        <div className="activity bold border-bottom">Bordtennis</div>
        <div className="flex-spread border-bottom">
          <div className="flex-left">
            <div className="date">{date}</div>
            <div className="month">{month}</div>
          </div>
          <div className="time">{time}</div>
        </div>
        <p className="details">{details}</p>
        <div className="partner">/ {partner}</div>
      </Button>
    </>
  );
};

export default ScheduleItem;
