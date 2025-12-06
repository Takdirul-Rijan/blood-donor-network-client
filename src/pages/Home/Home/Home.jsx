import React from "react";
import Reviews from "../Reviews/Reviews";
import HowItWorks from "../HowItWorks/HowItWorks";
import Featured from "../Featured/Featured";
import Banner from "../Banner/Banner";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const stepsPromise = fetch("/howItWorks.json").then((res) => res.json());
const featuresPromise = fetch("/featured.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-16">
      <Banner></Banner>
      <Featured featuresPromise={featuresPromise}></Featured>
      <HowItWorks stepsPromise={stepsPromise}></HowItWorks>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
