import { useEffect, useState } from "react";

// Set the type for timeLeft
interface timeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  // Create a function that calculates the time left and set the type return of timeLeft
  const calculateTimeLeft = (): timeLeft => {
    // Get the current year
    let this_year = new Date().getFullYear();
    const difference = +new Date(`6/26/${this_year}`) - +new Date();

    // Make a blank array to get the time thats left
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    // Add the time left to the array if the difference is greater than zero
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  // Create a state to store the timeLeft
  const [timeLeft, setTimeLeft] = useState<timeLeft>(calculateTimeLeft());

  // Create an array to store the timer components
  const timerComponents: JSX.Element[] = [];

  // Loop through the timeLeft and add the timer components
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof timeLeft]) {
      return;
    }

    // Add the timer components to the array
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval as keyof timeLeft]} {interval}{" "}
      </span>
    );
  });

  //  Create a useEffect to update the timeLeft
  useEffect(() => {
    // Create a Timer
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Return the timer components
  return (
    <div id="countdown" className="w-full mt-32">
      <div className="flex flex-col items-center justify-center text-blue-700 text-xl md:text-4xl md:flex-row font-bold text-center gap-3">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>GUESS WHAT DAY IT IS!</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
