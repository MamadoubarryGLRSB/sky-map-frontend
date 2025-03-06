'use client';
import { Star } from '@/types/star.types';

interface StarDetailsProps {
  star: Star;
  onClose: () => void;
}

export default function StarDetails({ star, onClose }: StarDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{star.bf || `Star ${star.id}`}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl focus:outline-none">
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Informations de base</h3>
            <p className="text-gray-300">
              <span className="text-gray-400">ID HIP:</span> {star.hip}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">ID HD:</span> {star.hd}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Type spectral:</span> {star.spect}
            </p>
            {star.constellation && (
              <p className="text-gray-300">
                <span className="text-gray-400">Constellation:</span> {star.constellation.name}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Luminosité</h3>
            <p className="text-gray-300">
              <span className="text-gray-400">Magnitude apparente:</span> {star.mag}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Magnitude absolue:</span> {star.absmag}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Indice de couleur:</span> {star.ci}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Luminosité:</span> {star.lum} L☉
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Position</h3>
            <p className="text-gray-300">
              <span className="text-gray-400">Ascension droite:</span> {star.ra}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Déclinaison:</span> {star.dec}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Distance:</span> {star.dist} parsecs
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Mouvement</h3>
            <p className="text-gray-300">
              <span className="text-gray-400">Mouvement propre RA:</span> {star.pmra}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Mouvement propre Dec:</span> {star.pmdec}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Vitesse radiale:</span> {star.rv} km/s
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Coordonnées galactiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-gray-300">
              <span className="text-gray-400">X:</span> {star.x.toFixed(2)}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Y:</span> {star.y.toFixed(2)}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Z:</span> {star.z.toFixed(2)}
            </p>
          </div>
        </div>

        {star.var && star.var !== star.bf && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Variabilité</h3>
            <p className="text-gray-300">
              <span className="text-gray-400">Nom de variable:</span> {star.var}
            </p>
            {star.var_min > 0 && (
              <p className="text-gray-300">
                <span className="text-gray-400">Magnitude minimale:</span> {star.var_min}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
