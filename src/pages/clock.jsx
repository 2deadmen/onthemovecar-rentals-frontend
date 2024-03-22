import React, { useState, useEffect } from "react";
import "../styles/clock.css";

const Clock = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 17) {
      // Between 9 AM and 5 PM, return 30 minutes in seconds
      return 30 * 60;
    } else {
      // Else, return 1 hour in seconds
      return 60 * 60;
    }
  }

  // Update timeLeft every second
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <>
   <div className="flex items-center content-center flex-col">
   <div className="hourglassBackground  h-74 mt-10">
        <div className="hourglassContainer">
          <div className="hourglassCurves"></div>
          <div className="hourglassCapTop"></div>
          <div className="hourglassGlassTop"></div>
          <div className="hourglassSand"></div>
          <div className="hourglassSandStream"></div>
          <div className="hourglassCapBottom"></div>
          <div className="hourglassGlass"></div>
        </div>
      </div>
      <center>
        <div className="timer text-4xl flex items-center content-center ">
          Our team will call you in : {Math.floor(timeLeft / 60)} minutes and{" "}
          {timeLeft % 60} seconds
        </div>
      </center>
   </div>
 
    
     
    </>
  );
};

export default Clock;
