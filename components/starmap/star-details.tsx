'use client';

import { Star } from '@/types/star.types';

interface StarDetailsProps {
  star: Star;
  onClose: () => void;
}

export default function StarDetails({ star, onClose }: StarDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4">
        <h2 className="text-2xl text-white mb-4">{star.bf || `Star ${star.id}`}</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <p>Distance: {star.dist} parsecs</p>
          <p>Magnitude: {star.mag}</p>
          <p>Spectral Type: {star.spect}</p>
          <p>Right Ascension: {star.ra}</p>
          <p>Declination: {star.dec}</p>
          {star.constellation && <p>Constellation: {star.constellation.name}</p>}
        </div>
        <button onClick={onClose} className="mt-6 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Close
        </button>
      </div>
    </div>
  );
}
