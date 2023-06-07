import { useEffect, useState } from "react";
import CountdownCalculator from "../hooks/CountdownCalculator";

export const Home = () => {
  // Set a const for the birthday name
  const [birthdayName, setBirthdayName] = useState("!");
  const timerComponents = CountdownCalculator();

  useEffect(() => {
    // Fetch the value of the environment variable and set it as the initial value of birthdayName
    if (import.meta.env.VITE_NAME) {
      setBirthdayName(import.meta.env.VITE_NAME);
    } else {
      setBirthdayName("Birthday Boy");
    }
  }, []);
  return (
    <div id="home" className="pt-24 mb-10">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-semibold text-center text-white text-sm mb-10 rounded-xl bg-slate-900 px-2 py-1 outline-1 outline-gray-600">
          🎂 Well if it ain't the birthday boy!
        </h3>
        <h1 className="font-bold text-center text-3xl text-white md:text-5xl mb-10 leading-normal md:leading-relaxed">
          Happy Birthday,
          <span className="text-blue-600">
            <br />
            {birthdayName}
          </span>
          !
        </h1>
        {!timerComponents.length ? (
          <div>
            <h3 className="font-regular text-center text-white text-sm mb-10 leading-loose">
              It's about time.{" "}
            </h3>
            <button className="rounded-md bg-white py-4 px-4 font-semi-bold hover:bg-blue-600 hover:text-white ease-in duration-100">
              <a href="#gift">Get Your Gift 🎁</a>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-regular text-center text-white text-sm mb-10 p-4 leading-loose">
              (Ok fine it's not your birthday ....just yet) <br /> In the mean
              time, we made this small website for you to have fun with.
            </h3>
            <button className="rounded-md bg-white py-4 px-4 font-semi-bold hover:bg-blue-600 hover:text-white ease-in duration-100">
              <a href="#makecake">Get Started 🔥</a>
            </button>
          </div>
        )}
        <h3 className="font-extra-light text-center text-white text-xs md:text-sm m-10">
          Just promise you won't try to break anything 🤡
        </h3>
      </div>
    </div>
  );
};

export default Home;
