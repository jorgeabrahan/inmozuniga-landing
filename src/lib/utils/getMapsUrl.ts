export const getMapsUrl = (latitude: string, longitude: string) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}
