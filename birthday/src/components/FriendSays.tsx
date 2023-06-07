import { useEffect, useState } from "react";
import FriendImage from "../assets/friend.jpg";
import CountdownCalculator from "../hooks/CountdownCalculator";

interface BirthdayMessageResponse {
  text: string;
}

const FriendSays = () => {
  const [message, setMessage] = useState<string>("");
  const timerComponents = CountdownCalculator();

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/get_birthday_message`
        );
        if (response.ok) {
          const data: BirthdayMessageResponse = await response.json();
          setMessage(data.text);
        } else {
          console.error(
            "Error fetching birthday message. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching birthday message:", error);
      }
    };
    fetchBirthdayMessage();
  }, []);

  return (
    <div
      id="friendsays"
      className="flex items-center justify-center mb-20 mt-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-[75%] bg-black rounded-lg shadow">
        <div className="md:w-1/3 m-8 flex justify-center">
          <img
            src={FriendImage}
            alt="Friend"
            className="rounded-full md:h-80 h-80 object-cover"
          />
        </div>
        {!timerComponents.length ? (
          <div className="md:w-2/3 w-full bg-blue-500 text-white rounded-t-lg p-14 m-10">
            <p className="md:text-xl font-bold">
              Happy Birthday Wesley. Hope you enjoy your special day . . . you
              bitch.
            </p>
          </div>
        ) : (
          <div className="md:w-2/3 w-full bg-blue-500 text-white rounded-t-lg p-14 m-10">
            <p className="md:text-xl font-bold">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendSays;
