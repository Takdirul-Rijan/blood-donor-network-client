import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">{review.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{review.role}</p>
      <p className="text-gray-700 mb-4">{review.comment}</p>

      <div className="text-yellow-500 flex justify-center gap-1">
        {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
          <FaStar key={i} size={20} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
