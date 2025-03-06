'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = [];

  // Créer un tableau de numéros de page à afficher
  if (totalPages <= 7) {
    // Si moins de 7 pages, afficher toutes les pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Sinon, utiliser une stratégie avec ellipsis
    if (currentPage <= 3) {
      // Si on est au début
      pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Si on est à la fin
      pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Si on est au milieu
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <div className="flex justify-center my-6">
      <div className="flex rounded-md shadow-sm">
        {/* Bouton Précédent */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative px-4 py-2 text-sm font-medium rounded-l-md ${
            currentPage === 1
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Précédent
        </button>

        {/* Boutons de pagination */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`relative px-4 py-2 text-sm font-medium ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'bg-gray-700 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        {/* Bouton Suivant */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative px-4 py-2 text-sm font-medium rounded-r-md ${
            currentPage === totalPages
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
