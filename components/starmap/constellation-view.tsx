'use client';
import { Constellation } from '@/types/constellation.types';
import { Star } from '@/types/star.types';

interface ConstellationViewProps {
  constellations: Constellation[];
  onStarSelect: (star: Star) => void;
}

export default function ConstellationView({ constellations, onStarSelect }: ConstellationViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {constellations.map((constellation) => (
        <div key={constellation.id} className="bg-gray-800 p-6 rounded">
          <h3 className="text-white text-2xl mb-4">{constellation.name}</h3>
          {constellation.stars && constellation.stars.length > 0 ? (
            <div className="space-y-3">
              {constellation.stars.map((star) => (
                <div
                  key={star.id}
                  onClick={() => onStarSelect(star)}
                  className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600"
                >
                  <p className="text-white">{star.bf || `Star ${star.id}`}</p>
                  <p className="text-gray-300 text-sm">Magnitude: {star.mag}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aucune étoile visible</p>
          )}
        </div>
      ))}
    </div>
  );
}
