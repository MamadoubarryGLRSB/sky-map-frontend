"use client";

import { useEffect, useState } from "react";

import BrightestStars from "./brightest-stars";
import ConstellationView from "./constellation-view";
import HottestStars from "./hottest-stars"; // 🔥 Ajouté
import LargestStars from "./largest-stars"; // 🌟 Ajouté
import NearestStars from "./nearest-stars";
import { Star } from "@/types/star.types";
import StarDetails from "./star-details";
import { StarMapData } from "@/types/api-responses.types";

interface StarMapWrapperProps {
  starMapData: StarMapData;
}

export default function StarMapWrapper({ starMapData }: StarMapWrapperProps) {
  const [selectedView, setSelectedView] = useState("nearest");
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);

  const handleStarSelect = (star: Star) => {
    setSelectedStar(star);
  };
  useEffect(() => {
    console.log("StarMapData:", starMapData);
    console.log(
      "Hottest Stars:",
      Array.isArray(starMapData.hottestStars)
        ? starMapData.hottestStars.length
        : "Invalid data"
    );
    console.log(
      "Largest Stars:",
      Array.isArray(starMapData.largestStars)
        ? starMapData.largestStars.length
        : "Invalid data"
    );
  }, [starMapData]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/sky-map.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Sky Map</h1>

        {/* Menu de sélection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedView("nearest")}
            className={`px-4 py-2 rounded ${
              selectedView === "nearest" ? "bg-blue-600" : "bg-blue-400"
            }`}
          >
            Nearest Stars
          </button>
          <button
            onClick={() => setSelectedView("brightest")}
            className={`px-4 py-2 rounded ${
              selectedView === "brightest" ? "bg-yellow-600" : "bg-yellow-400"
            }`}
          >
            Brightest Stars
          </button>
          <button
            onClick={() => setSelectedView("hottest")}
            className={`px-4 py-2 rounded ${
              selectedView === "hottest" ? "bg-red-600" : "bg-red-400"
            }`}
          >
            Hottest Stars
          </button>
          <button
            onClick={() => setSelectedView("largest")}
            className={`px-4 py-2 rounded ${
              selectedView === "largest" ? "bg-green-600" : "bg-green-400"
            }`}
          >
            Largest Stars
          </button>
          <button
            onClick={() => setSelectedView("constellations")}
            className={`px-4 py-2 rounded ${
              selectedView === "constellations" ? "bg-blue-600" : "bg-blue-400"
            }`}
          >
            Constellations
          </button>
        </div>

        {/* Affichage des vues selon la sélection */}
        <div className="relative">
          {selectedView === "nearest" && (
            <NearestStars
              stars={starMapData.nearestStars}
              onStarSelect={handleStarSelect}
            />
          )}
          {selectedView === "brightest" && (
            <BrightestStars
              stars={starMapData.brightestStars}
              onStarSelect={handleStarSelect}
            />
          )}
          {selectedView === "hottest" && (
            <HottestStars
              stars={starMapData.hottestStars}
              onStarSelect={handleStarSelect}
            />
          )}
          {selectedView === "largest" && (
            <LargestStars
              stars={starMapData.largestStars}
              onStarSelect={handleStarSelect}
            />
          )}
          {selectedView === "constellations" && (
            <ConstellationView
              constellations={starMapData.constellations}
              onStarSelect={handleStarSelect}
            />
          )}

          {selectedStar && (
            <StarDetails
              star={selectedStar}
              onClose={() => setSelectedStar(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
