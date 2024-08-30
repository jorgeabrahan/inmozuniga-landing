export const extractCoordinates = (url: string) => {
  const regex = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/;
  const match = url.match(regex);
  if (match) {
    const longitude = match[1];
    const latitude = match[2];
    return { latitude, longitude };
  } else {
    return { latitude: null, longitude: null };
  }
}
