export type IntlTelInputSettings = {
  placeholderNumberType?: "FIXED_LINE" | "MOBILE";
  initialCountry?: string;
  onlyCountries?: string[];
  geoIpLookup?: (callback: (countryCode: string) => void) => void;
  nationalMode?: boolean;
  allowDropdown?: boolean;
  showFlags?: boolean;
  separateDialCode?: boolean;
  utilsScript?: string;
};

interface CountryData {
  name: string;
  iso2: string;
  dialCode: string;
}

export type IntlTelInputInstance = {
  isValidNumber: () => boolean;
  isValidNumberPrecise: () => boolean;
  getSelectedCountryData: () => CountryData;
  setCountry: (countryCode: string) => void;
  getNumber: (type?: number) => string;
  setNumber: (number: string) => void;
}
