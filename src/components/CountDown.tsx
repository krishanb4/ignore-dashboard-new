import React, { useState, useEffect } from "react";

function CountdownTimer(timestamp: number) {
  const [countdown, setCountdown] = useState<string | number>();

  useEffect(() => {
    // Replace targetTimestamp with the desired target timestamp
    const targetTimestamp = timestamp;

    // Calculate the countdown
    const interval = setInterval(() => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const remainingTime = targetTimestamp - currentTimestamp;

      // Check if the countdown has reached zero
      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown("00:00:00");
      } else {
        const days = Math.floor(remainingTime / (24 * 60 * 60));
        const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);

        const countdownText = `${days} Days ${hours} Hours ${minutes} Minutes`;
        setCountdown(countdownText);
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [timestamp]);

  return countdown;
}

export default CountdownTimer;
