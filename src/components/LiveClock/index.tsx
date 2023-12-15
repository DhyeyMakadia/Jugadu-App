import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  return <span>{date.toLocaleDateString()}  {date.toLocaleTimeString()}</span>;
};

export default LiveClock;
