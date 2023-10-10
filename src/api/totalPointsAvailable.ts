interface PointsAvailable {
  classPoints: number;
  specPoints: number;
}

export function buildPointsAvailable() {
  const totalPointsAvailable: Record<number, PointsAvailable> = {} as Record<number, PointsAvailable>;
  let classPoints = 0;
  let specPoints = 0;
  for (let i = 10; i <= 70; i++) {
    if (i % 2 === 0) {
      classPoints++;
      totalPointsAvailable[i] = {
        classPoints,
        specPoints
      }
    } else {
      specPoints++;
      totalPointsAvailable[i] = {
        classPoints,
        specPoints
      }
    }
  }
  return totalPointsAvailable;
}