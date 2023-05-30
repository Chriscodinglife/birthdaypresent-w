import { useState } from "react";
import TestImage from "../assets/test_image.png";

export const Makecake = () => {
  return (
    <div id="makecake" className="w-full p-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white font-semi-bold text-center mb-16">
          Generate a cool dragon with a cake
        </h1>
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-white font-semi-bold w-1/3 p-7 m-5">
            Make some awesome 8-bit dragons with our{" "}
            <span className="text-blue-600">Dragon and Cake Generator</span>.
            <br />
            <br />
            <br />
            🤔Who knows, this can be your next discord icon?
          </h2>
          <div className="flex flex-col items-center justify-center w-2/3">
            <img src={TestImage} alt="test" className="w-1/2" />
            <div className="p-10">
              <button className="bg-white text-black font-semi-bold px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
                Get New Cake 🍑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makecake;
