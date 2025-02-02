import { Star } from './star.types';

export interface Constellation {
  id: number;
  name: string;
  stars?: Star[];
}
