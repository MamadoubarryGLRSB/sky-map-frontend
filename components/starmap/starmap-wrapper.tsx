'use client';

import { useState } from 'react';
import { StarMapData } from '@/types/api-responses.types';
import { Star } from '@/types/star.types';
import NearestStars from './nearest-stars';
import BrightestStars from './brightest-stars';
import ConstellationView from './constellation-view';
import StarDetails from './star-details';

interface StarMapWrapperProps {
  starMapData: StarMapData;
}

export default function StarMapWrapper({ starMapData }: StarMapWrapperProps) {
  const [selectedView, setSelectedView] = useState('nearest');
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);

  const handleStarSelect = (star: Star) => {
    setSelectedStar(star);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/sky-map.jpg')",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Sky Map</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedView('nearest')}
            className={`px-4 py-2 rounded ${selectedView === 'nearest' ? 'bg-blue-600' : 'bg-blue-400'}`}
          >
            Nearest Visible Stars
          </button>
          <button
            onClick={() => setSelectedView('brightest')}
            className={`px-4 py-2 rounded ${selectedView === 'brightest' ? 'bg-blue-600' : 'bg-blue-400'}`}
          >
            Brightest Stars
          </button>
          <button
            onClick={() => setSelectedView('constellations')}
            className={`px-4 py-2 rounded ${selectedView === 'constellations' ? 'bg-blue-600' : 'bg-blue-400'}`}
          >
            Constellations
          </button>
        </div>

        <div className="relative">
          {selectedView === 'nearest' && (
            <NearestStars stars={starMapData.nearestStars} onStarSelect={handleStarSelect} />
          )}

          {selectedView === 'brightest' && (
            <BrightestStars stars={starMapData.brightestStars} onStarSelect={handleStarSelect} />
          )}

          {selectedView === 'constellations' && (
            <ConstellationView constellations={starMapData.constellations} onStarSelect={handleStarSelect} />
          )}

          {selectedStar && <StarDetails star={selectedStar} onClose={() => setSelectedStar(null)} />}
        </div>
      </div>
    </div>
  );
}
