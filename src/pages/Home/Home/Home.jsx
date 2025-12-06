import React from "react";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import ContactSection from "../ContactSection/ContactSection";

const Home = () => {
  return (
    <div className="space-y-16">
      <Banner />
      <Featured />
      <ContactSection />
    </div>
  );
};

export default Home;
