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
    <div className="flex items-center justify-center">
      <div className="flex flex-row-reverse items-center w-96 bg-white rounded-lg shadow">
        <div className="p-4">
          <img
            src={FriendImage}
            alt="Friend"
            className="h-24 w-24 rounded-full"
          />
        </div>
        <div className="p-4 bg-blue-500 text-white rounded-t-lg">
          <p className="text-2xl font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendSays;
