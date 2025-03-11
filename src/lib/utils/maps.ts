export const extractCoordinatesFromMapsUrl = (embedMapsUrl: string) => {
  const regex = /!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/;
  const match = embedMapsUrl.match(regex);
  if (match) {
    const longitude = match[1];
    const latitude = match[2];
    return { latitude, longitude };
  } else {
    return { latitude: null, longitude: null };
  }
}

export const getMapsUrl = (latitude: string, longitude: string) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
