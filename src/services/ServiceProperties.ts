import {
  PROPERTY_AVAILABILITY,
  PROPERTY_CATEGORY,
} from "@lib/constants/property";
import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { cosmic } from "src/config/cosmic";

export class ServiceProperties {
  static async getProperty(
    slug: string,
  ): Promise<{ ok: boolean; data: TypeCosmicProperty | null }> {
    try {
      const response = await cosmic.objects
        .findOne({
          type: "properties",
          slug: slug,
        })
        .props("slug,title,metadata,type,thumbnail")
        .depth(1);
      if (!response.object) {
        throw new Error("Property not found");
      }
      return {
        ok: true,
        data: response.object,
      };
    } catch {
      return {
        ok: false,
        data: null,
      };
    }
  }
  static async getAllProperties() {
    try {
      const response = await cosmic.objects
        .find({
          type: "properties",
        })
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
  static async getProperties({
    limit = 10,
    page = 1,
    availability,
    category,
    minTotalPrice,
    minInstallmentPrice,
    minMeters,
    minRods,
    minBedrooms,
    minBathrooms,
    minFloors,
    minParkingLots,
  }: {
    limit?: number;
    page?: number;
    availability?: TypePropertyAvailabilityKey;
    category?: TypePropertyCategoryKey;
    minTotalPrice?: number;
    minInstallmentPrice?: number;
    minMeters?: number;
    minRods?: number;
    minBedrooms?: number;
    minBathrooms?: number;
    minFloors?: number;
    minParkingLots?: number;
  } = {}): Promise<{ ok: boolean; data: TypeCosmicProperty[]; total: number }> {
    try {
      const queryParams: any = {
        type: "properties",
      };

      if (availability) {
        queryParams["metadata.availability.value"] =
          PROPERTY_AVAILABILITY[availability];
      }

      if (category) {
        queryParams["metadata.category.value"] = PROPERTY_CATEGORY[category];
      }

      if (typeof minTotalPrice === "number" && minTotalPrice > 0) {
        queryParams["metadata.prices.total"] = { $gte: minTotalPrice };
      }

      if (typeof minInstallmentPrice === "number" && minInstallmentPrice > 0) {
        queryParams["metadata.prices.installment"] = {
          $gte: minInstallmentPrice,
        };
      }

      if (typeof minMeters === "number" && minMeters > 0) {
        queryParams["metadata.measurements.meters"] = { $gte: minMeters };
      }

      if (typeof minRods === "number" && minRods > 0) {
        queryParams["metadata.measurements.rods"] = { $gte: minRods };
      }

      if (typeof minBedrooms === "number" && minBedrooms > 0) {
        queryParams["metadata.traits.bedrooms"] = { $gte: minBedrooms };
      }

      if (typeof minBathrooms === "number" && minBathrooms > 0) {
        queryParams["metadata.traits.bathrooms"] = { $gte: minBathrooms };
      }

      if (typeof minFloors === "number" && minFloors > 0) {
        queryParams["metadata.traits.floors"] = { $gte: minFloors };
      }

      if (typeof minParkingLots === "number" && minParkingLots > 0) {
        queryParams["metadata.traits.parking_lots"] = { $gte: minParkingLots };
      }

      const skip = (page - 1) * limit;

      const response = await cosmic.objects
        .find(queryParams)
        .limit(limit)
        .skip(skip)
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
