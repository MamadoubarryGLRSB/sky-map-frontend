import { Constellation } from './constellation.types';
import { Star } from './star.types';

export interface StarMapData {
  nearestStars: Star[];
  brightestStars: Star[];
  hottestStars: Star[];
  largestStars: Star[];
  constellations: Constellation[];
}
