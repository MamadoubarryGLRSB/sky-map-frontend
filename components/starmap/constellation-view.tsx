'use client';
import { useState } from 'react';
import { Constellation } from '@/types/constellation.types';
import { Star } from '@/types/star.types';
import Pagination from './pagination';

interface ConstellationViewProps {
  constellations: Constellation[];
  onStarSelect: (star: Star) => void;
}

export default function ConstellationView({ constellations, onStarSelect }: ConstellationViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 2 constellations par ligne × 3 lignes = 6 constellations par page

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(constellations.length / itemsPerPage);

  // Obtenir les constellations pour la page actuelle
  const currentConstellations = constellations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Faire défiler vers le haut de la liste quand on change de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentConstellations.map((constellation) => (
          <div key={constellation.id} className="bg-gray-800 p-6 rounded">
            <h3 className="text-white text-2xl mb-4">{constellation.name}</h3>
            {constellation.stars && constellation.stars.length > 0 ? (
              <div className="space-y-3">
                {constellation.stars.slice(0, 5).map((star) => (
                  <div
                    key={star.id}
                    onClick={() => onStarSelect(star)}
                    className="bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <p className="text-white">{star.bf || `Star ${star.id}`}</p>
                    <p className="text-gray-300 text-sm">Magnitude: {star.mag}</p>
                  </div>
                ))}
                {constellation.stars.length > 5 && (
                  <p className="text-gray-400 text-sm italic">+ {constellation.stars.length - 5} autres étoiles</p>
                )}
              </div>
            ) : (
              <p className="text-gray-400">Aucune étoile visible</p>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
