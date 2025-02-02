'use client';
import { Star } from '@/types/star.types';

interface BrightestStarsProps {
  stars: Star[];
  onStarSelect: (star: Star) => void;
}

export default function BrightestStars({ stars, onStarSelect }: BrightestStarsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stars.map((star: Star) => (
        <div
          key={star.id}
          onClick={() => onStarSelect(star)}
          className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700"
        >
          <h3 className="text-white text-xl">{star.bf || `Star ${star.id}`}</h3>
          <p className="text-gray-300">Magnitude absolue: {star.absmag}</p>
          <p className="text-gray-300">Magnitude apparente: {star.mag}</p>
          {star.constellation && <p className="text-gray-300">Constellation: {star.constellation.name}</p>}
        </div>
      ))}
    </div>
  );
}
