import React from "react";
// reactstrap components
import { Button } from "reactstrap";

const ScheduleItem = (props) => {
  const { title, date, details, partner, icon, link } = props;
  return (
    <>
      <div className="schedule-item" color="light" outline type="button">
        <div className="flex-spread border-bottom">
          <div className="flex-left">
            <div className="date">{date}</div>
          </div>
          <div className="logo-container">
            <img src={icon} className="logo" alt={partner} />
          </div>
        </div>
        <div className="activity bold border-bottom">{title}</div>
        <p className="details">{details}</p>
        <Button href={link}>Läs mer här</Button>
      </div>
    </>
  );
};

export default ScheduleItem;
