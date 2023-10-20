import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const CountDown = () => {
  const [timerDate, setTimerDate] = useState("");
  useEffect(() => {
    const calculateNextMonthDate = () => {
      const today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      let yyyy = today.getFullYear();
      if (mm === "12") {
        mm = "01";
        yyyy = yyyy + 1;
      } else {
        mm = (parseInt(mm) + 1).toString().padStart(2, "0");
      }
      const nextMonthDate = `${mm}/${dd}/${yyyy}`;
      setTimerDate(nextMonthDate);
    };
    calculateNextMonthDate();
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  return (
    <div>
      {timerDate && (
        <Countdown date={new Date(timerDate)} renderer={renderer} />
      )}
    </div>
  );
};

// Countdown renderer function to customize the output
const renderer = ({ days, hours, minutes, seconds }) => (
  <div className="countdown-timer" id="countdown">
    <div className="cd-item">
      <span>{days}</span> <p>Days</p>
    </div>
    <div className="cd-item">
      <span>{hours}</span> <p>Hrs</p>
    </div>
    <div className="cd-item">
      <span>{minutes}</span> <p>Mins</p>
    </div>
    <div className="cd-item">
      <span>{seconds}</span> <p>Secs</p>
    </div>
  </div>
);

export default CountDown;
