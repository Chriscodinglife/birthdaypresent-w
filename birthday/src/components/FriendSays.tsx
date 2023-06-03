import { useEffect, useState } from "react";
import axios from "axios";
import FriendImage from "../assets/friend.jpg";

interface BirthdayMessageResponse {
  text: string;
}

const FriendSays = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchBirthdayMessage = async () => {
      try {
        const response = await axios.get<BirthdayMessageResponse>(
          "http://127.0.0.1:8000/get_birthday_message"
        );
        console.log(response);
        setMessage(response.data.text);
      } catch (error) {
        console.error("Error fetching birthday message:", error);
      }
    };

    fetchBirthdayMessage();
  }, []);

  return (
    <div id="friendsays" className="flex items-center justify-center">
      <div className="flex flex-row items-center justify-between w-[75%] bg-black rounded-lg shadow">
        <div className="w-1/3 m-8 flex justify-center">
          <img
            src={FriendImage}
            alt="Friend"
            className="rounded-full h-80 object-cover"
          />
        </div>
        <div className="w-2/3 bg-blue-500 text-white rounded-t-lg p-14 m-10">
          <p className="text-xl font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendSays;
