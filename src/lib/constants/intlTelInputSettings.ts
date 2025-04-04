import type { IntlTelInputSettings } from "@lib/types";
import { getUserCountryData } from "@lib/utils/intl";

export const intlTelInputSettings: IntlTelInputSettings = {
  placeholderNumberType: "MOBILE",
  initialCountry: "auto",
  geoIpLookup: (callback: (countryCode: string) => void) => {
    getUserCountryData().then(callback).catch(callback);
  },
  separateDialCode: true,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js",
};
