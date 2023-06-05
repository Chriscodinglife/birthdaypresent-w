import { useEffect, useState } from "react";
import CountdownCalculator from "../hooks/CountdownCalculator";

const handleAmazonButtonClick = () => {
  window.location.href =
    "https://www.amazon.com/gp/css/gc/payment/view-gc-balance";
};

const Gift = () => {
  const timerComponents = CountdownCalculator();
  const [giftCard, setGiftCard] = useState("");

  useEffect(() => {
    // Fetch the value of the environment variable and set it as the initial value of giftCard
    if (import.meta.env.VITE_CARD) {
      setGiftCard(import.meta.env.VITE_CARD);
    } else {
      setGiftCard("X");
    }
  }, []);

  return (
    <section id="gift" className="w-full pt-32 pb-32  bg-gray-900 text-white">
      {!timerComponents.length ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-md text-center font-bold text-2xl md:text-3xl text-white mb-5">
            🎂Happy Birthday!🎂
          </p>
          <p className="text-center md:text-center md:font-bold text-sm md:text-2xl text-white mb-5">
            😲Here is your code for an Amazon Gift Card:
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex flex-col justify-center items-center w-[400px]">
              <img
                src="https://d13080yemosbe2.cloudfront.net/Images/GiftCardFaceplates/External/AMAZON_fp01.png"
                alt="amazon gift card"
                className="w-5/6 md:w-full rounded-lg shadow-white relative my-5"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start gap-3">
              <p className="text-md text-center md:text-md text-white p-7 m-1 bg-green-900 border-gray-800 rounded-lg">
                {giftCard}
              </p>
              <button
                className="bg-purple-500 text-white font-bold text-md p-7 m-1 rounded-lg shadow-lg hover:bg-yellow-300 hover:text-black hover:shadow-neutral-50"
                onClick={handleAmazonButtonClick}
              >
                Redeem your Code
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center m font-bold text-md md:text-3xl text-white">
          👋Make sure to come back here on your Birthday!👋
        </p>
      )}
    </section>
  );
};

export default Gift;
