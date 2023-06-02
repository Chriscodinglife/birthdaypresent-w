import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Makecake from "./components/Makecake";
import FriendsList from "./components/FriendsList";

function App() {
  return (
    <div className="h-full bg-black flex flex-col">
      <Navbar />
      <Home />
      <FriendsList names={["Cesar", "Maria", "Lauren", "Shreeyans", "Chris"]} />
      <Makecake />
    </div>
  );
}

export default App;
