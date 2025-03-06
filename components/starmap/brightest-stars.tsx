'use client';
import { useState } from 'react';
import { Star } from '@/types/star.types';
import Pagination from './pagination';

interface BrightestStarsProps {
  stars: Star[];
  onStarSelect: (star: Star) => void;
}

export default function BrightestStars({ stars, onStarSelect }: BrightestStarsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4 étoiles par ligne × 3 lignes = 12 étoiles par page

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(stars.length / itemsPerPage);

  // Obtenir les étoiles pour la page actuelle
  const currentStars = stars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Faire défiler vers le haut de la liste quand on change de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStars.map((star: Star) => (
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

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
