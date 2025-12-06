import React from "react";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-16">
      <Banner />
      <Featured />
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
