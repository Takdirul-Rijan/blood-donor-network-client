import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4"
      />
      <h3 className="text-base sm:text-lg md:text-xl font-semibold">
        {review.name}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-2">
        {review.role}
      </p>
      <p className="text-sm sm:text-base md:text-base text-gray-700 mb-4">
        {review.comment}
      </p>

      <div className="text-yellow-500 flex justify-center gap-1">
        {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
          <FaStar key={i} size={20} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
