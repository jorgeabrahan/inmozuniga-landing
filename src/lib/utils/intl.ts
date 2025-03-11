export const getUserCountryData = async () => {
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code;
  } catch (err) {
    return "hn";
  }
};
