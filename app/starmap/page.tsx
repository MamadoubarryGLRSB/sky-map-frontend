import StarMapWrapper from '@/components/starmap/starmap-wrapper';
import { StarMapData } from '@/types/api-responses.types';

async function getStarData(): Promise<StarMapData> {
  const nearestStars = await fetch(`http://localhost:3000/stars/nearest-visible`);
  const brightestStars = await fetch(`http://localhost:3000/stars/brightest`);
  const constellations = await fetch(`http://localhost:3000/stars/constellations`);

  return {
    nearestStars: await nearestStars.json(),
    brightestStars: await brightestStars.json(),
    constellations: await constellations.json()
  };
}

export default async function StarMapPage() {
  const starMapData = await getStarData();
  return <StarMapWrapper starMapData={starMapData} />;
}
