import React, { useEffect, useState } from "react";

interface FriendsListProps {
  names: string[];
}

export const FriendsList = ({ names }: FriendsListProps) => {
  const [highlightedName, setHighlightedName] = useState("");

  const handleNameHover = (name: string) => {
    setHighlightedName(name);
  };
  return (
    <div className="flex flex-col bg-gray-900 p-10">
      <h2 className="text-white text-center md:text-2xl text-md">
        Your crew that helped make this happen:{" "}
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center px-32 pt-10">
        {names.map((name, index) => (
          <div
            key={index}
            className={`p-2 text-lg cursor-pointer transition-colors duration-200 ${
              highlightedName === name
                ? "text-white text-center"
                : "text-gray-500"
            }`}
            onMouseEnter={() => handleNameHover(name)}
            onMouseLeave={() => handleNameHover("")}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
