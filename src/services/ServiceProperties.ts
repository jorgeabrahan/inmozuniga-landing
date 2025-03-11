import { PROPERTY_AVAILABILITY } from "@lib/constants/property";
import type { TypeCosmicProperty } from "@lib/types";
import { cosmic } from "src/config/cosmic";

export class ServiceProperties {
  static async getProperties({
    limit = 10,
    availabilityValue,
  }: {
    limit?: number;
    availabilityValue?: (typeof PROPERTY_AVAILABILITY)[keyof typeof PROPERTY_AVAILABILITY];
  } = {}): Promise<{ ok: boolean; data: TypeCosmicProperty[]; total: number }> {
    try {
      const queryParams: any = {
        type: "properties",
      };
      if (availabilityValue) {
        queryParams["metadata.availability.value"] = availabilityValue;
      }
      const response = await cosmic.objects
        .find(queryParams)
        .limit(limit)
        .props("slug,title,metadata,type,thumbnail")
        .depth(1);

      return {
        ok: true,
        data: response.objects ?? [],
        total: response.total ?? 0,
      };
    } catch (error) {
      return {
        ok: false,
        data: [],
        total: 0,
      };
    }
  }
}
