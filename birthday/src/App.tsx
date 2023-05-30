import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Makecake from "./components/Makecake";

function App() {
  return (
    <div className="h-full bg-black flex flex-col">
      <Navbar />
      <Home />
      <Makecake />
    </div>
  );
}

export default App;
