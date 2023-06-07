import { useEffect, useState } from "react";
import {
  AiOutlineComment,
  AiTwotoneHome,
  AiFillInstagram,
  AiOutlineUpSquare,
  AiFillGift,
} from "react-icons/ai"; // This is for importing the react icons
import DragonLogo from "../assets/dragon_logo_small.png";

export const Navbar = () => {
  const [nav, setNav] = useState(false); // Set a const to state the nav bar is false
  const handleNav = () => {
    setNav(!nav); // Set the nav bar to to the opposite of what it is
  };

  const [navbarBg, setNavbarBg] = useState("transparent");
  const [friendName, setFriendName] = useState("!");

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setNavbarBg("bg-gray-800"); // Change the background color when scrolled
      } else {
        setNavbarBg("transparent"); // Reset the background color when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch the value of the environment variable and set it as the initial value of birthdayName
    if (import.meta.env.VITE_FRIEND) {
      setFriendName(import.meta.env.VITE_FRIEND);
    } else {
      setFriendName("BFF");
    }
  }, []);

  // Itinerary operator to show the nav bar
  // If nav is true, then show the nav bar
  // If nav is false, then don't show the nav bar

  return (
    <div>
      <AiOutlineUpSquare
        onClick={handleNav}
        className="fixed top-3 right-3 z-50 text-white p-2 md:hidden text-4xl"
      />
      {nav ? (
        <div className="fixed w-full h-screen bg-black flex flex-col justify-center items-center z-20">
          <a
            onClick={handleNav}
            href="#home"
            className="w-[75%] flex justify-center items-center rounded-lg shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200"
          >
            <AiTwotoneHome size={20} />
            <span className="pl-4 text-black font-sans font-semi-bold">
              Home
            </span>
          </a>
          <a
            onClick={handleNav}
            href="#makecake"
            className="w-[75%] flex justify-center items-center rounded-lg shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200"
          >
            <AiFillInstagram size={20} />
            <span className="pl-4 text-black font-sans font-semi-bold">
              Make A Cake
            </span>
          </a>
          <a
            onClick={handleNav}
            href="#friendsays"
            className="w-[75%] flex justify-center items-center rounded-lg shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 py-5 cursor-pointer hover:scale-110 ease-in duration-200"
          >
            <AiOutlineComment size={20} />
            <span className="pl-4 text-black font-sans font-semi-bold">
              {friendName} Says
            </span>
          </a>
          <a
            onClick={handleNav}
            href="#gift"
            className="w-[75%] flex justify-center items-center rounded-lg shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 py-5 cursor-pointer hover:scale-110 ease-in duration-200 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-700 hover:text-white"
          >
            <AiFillGift size={20} />
            <span className="pl-4 text-black font-sans font-semi-bold hover:text-white">
              Open Gift
            </span>
          </a>
        </div>
      ) : (
        ""
      )}
      <div
        className={`md:block hidden fixed w-full flex flex-col z-10 px-20 py-4 mb-20 transition-colors duration-300 ${
          navbarBg !== "transparent" ? "bg-zinc-950" : ""
        }`}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center">
            <a
              href="#home"
              className="cursor-pointer hover:scale-110 ease-in duration-300"
            >
              <img src={DragonLogo} alt="Dragon Logo" className="w-[60px]" />
            </a>
          </div>

          <div className="flex flex-row space-x-3">
            <a
              href="#home"
              className="m-2 p-3 cursor-pointer text-white hover:text-blue-600 ease-in duration-300 font-semibold"
            >
              Home
            </a>
            <a
              href="#makecake"
              className="m-2 p-3 cursor-pointer text-white hover:text-blue-600 ease-in duration-300 font-semibold"
            >
              Make A Cake
            </a>
            <a
              href="#friendsays"
              className="m-2 p-3 cursor-pointer text-white hover:text-blue-600 ease-in duration-300 font-semibold"
            >
              {friendName} Says
            </a>
            <div className="flex flex-row pl-20">
              <a
                href="#gift"
                className="m-2 p-3 px-5 cursor-pointer text-white hover:text-white hover:rounded-lg hover:bg-blue-600 ease-in duration-300 font-sans font-extra-bold"
              >
                Open My Gift
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
