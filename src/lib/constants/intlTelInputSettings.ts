import type { IntlTelInputSettings } from "@lib/types";
import { getUserCountryData } from "@lib/utils";

const intlTelUtilsScript =
  "https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js";

export const intlTelInputSettings: IntlTelInputSettings = {
  placeholderNumberType: "MOBILE",
  initialCountry: "auto",
  geoIpLookup: (callback: (countryCode: string) => void) => {
    getUserCountryData().then(callback).catch(callback);
  },
  separateDialCode: true,
  utilsScript: intlTelUtilsScript,
};
