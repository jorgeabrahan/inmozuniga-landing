import type { IntlTelInputSettings } from "@lib/types";
import { getUserCountryData } from "@lib/utils/intl";

export const intlTelInputSettings: IntlTelInputSettings = {
  placeholderNumberType: "MOBILE",
  initialCountry: "auto",
  geoIpLookup: (callback: (countryCode: string) => void) => {
    getUserCountryData().then(callback).catch(callback);
  },
  separateDialCode: true,
};
