import { Constellation } from './constellation.types';

export interface Star {
  id: number;
  hip: number;
  hd: number;
  hr: number;
  gl: number;
  bf: string;
  ra: number;
  dec: number;
  dist: number;
  pmra: number;
  pmdec: number;
  rv: number;
  mag: number;
  absmag: number;
  spect: string;
  ci: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rarad: number;
  decrad: number;
  pmrarad: number;
  prdecrad: number;
  lum: number;
  var: string;
  var_min: number;
  var_max: number;
  constellationId: number;
  constellation?: Constellation;
}
