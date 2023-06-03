import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Makecake from "./components/Makecake";
import FriendsList from "./components/FriendsList";
import FriendSays from "./components/FriendSays";
import Countdown from "./components/Countdown";

function App() {
  return (
    <div className="h-full bg-black flex flex-col">
      <Navbar />
      <Countdown />
      <Home />
      <FriendsList names={["Cesar", "Maria", "Lauren", "Shreeyans", "Chris"]} />
      <Makecake />
      <FriendSays />
    </div>
  );
}

export default App;
