/** @format */

import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#f6f3eb]">
      <Hero />
      <RecentlyAdded />
    </main>
  );
};

export default Home;