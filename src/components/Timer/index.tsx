import { useEffect, useState } from 'react';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0
  });

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      let mins = now.getMinutes();

      if (mins % 5 === 0) {
        mins = mins + 5;
      } else {
        mins = Math.ceil(mins / 5) * 5;
      }

      now.setMinutes(mins);
      now.setSeconds(0);

      const countdownDate = now.getTime();
      const currentDate = new Date().getTime();
      const difference = countdownDate - currentDate;

      const m = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
      const s = Math.floor((difference % (60 * 1000)) / 1000);

      setTimeRemaining({ minutes: m, seconds: s });
    };

    calculateTimeRemaining();

    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className="align-center">{`${formatTime(
      timeRemaining.minutes
    )}m ${formatTime(timeRemaining.seconds)}s`}</span>
  );
};

export default Timer;
