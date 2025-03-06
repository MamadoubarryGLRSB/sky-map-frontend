"use client";

import Pagination from "./pagination";
import { Star } from "@/types/star.types";
import { useState } from "react";

interface LargestStarsProps {
  stars: Star[];
  onStarSelect: (star: Star) => void;
}

export default function LargestStars({
  stars,
  onStarSelect,
}: LargestStarsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(stars.length / itemsPerPage);
  const currentStars = stars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStars.map((star) => (
          <div
            key={star.id}
            onClick={() => onStarSelect(star)}
            className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700"
          >
            <h3 className="text-white text-xl">
              {star.bf || `Star ${star.id}`}
            </h3>
            <p className="text-gray-300">Luminosity: {star.lum}</p>
            <p className="text-gray-300">Magnitude: {star.mag}</p>
            {star.constellation && (
              <p className="text-gray-300">
                Constellation: {star.constellation.name}
              </p>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
