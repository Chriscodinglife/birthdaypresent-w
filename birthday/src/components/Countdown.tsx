import CountdownCalculator from "../hooks/CountdownCalculator";

const Countdown = () => {
  const timerComponents = CountdownCalculator();
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
