import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Makecake from "./components/Makecake";
import FriendsList from "./components/FriendsList";
import FriendSays from "./components/FriendSays";
import Countdown from "./components/Countdown";
import Gift from "./components/Gift";
import Footer from "./components/Footer";

function App() {
  const names = import.meta.env.VITE_FRIENDS?.split(",") || [];

  return (
    <div className="h-full bg-black flex flex-col">
      <Navbar />
      <Countdown />
      <Home />
      <FriendsList names={names} />
      <Makecake />
      <FriendSays />
      <Gift />
      <Footer />
    </div>
  );
}

export default App;
