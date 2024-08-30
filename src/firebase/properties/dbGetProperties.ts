import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { FIREBASE_DB } from "../config";
import { FIREBASE_COLLECTIONS } from "../constants";
import { getFormattedProperty } from "./getFormattedProperty";
import type {
  PropertyType,
  DBPropertyType,
} from "../../lib/types/PropertyTypes";
import type { QueryConstraint } from "firebase/firestore/lite";

export const dbGetProperties = async ({
  propertiesLimit,
  propertyImagesLimit,
  propertiesCategories,
  propertiesStatus,
}: {
  propertiesLimit?: number;
  propertyImagesLimit?: number;
  propertiesCategories?: string[];
  propertiesStatus?: string;
}): Promise<{
  ok: boolean;
  properties: PropertyType[];
}> => {
  try {
    const collectionRef = collection(
      FIREBASE_DB,
      FIREBASE_COLLECTIONS.properties,
    );
    const queryConstraints: QueryConstraint[] = [];
    // where-in can't be used with more than 10 values
    if (
      propertiesCategories &&
      propertiesCategories.length > 0 &&
      propertiesCategories.length <= 10
    ) {
      queryConstraints.push(where("categoria", "in", propertiesCategories));
    }
    if (propertiesStatus) {
      queryConstraints.push(where("estado", "==", propertiesStatus));
    }
    if (propertiesLimit) {
      queryConstraints.push(limit(propertiesLimit));
    }

    const propertiesQuery = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(propertiesQuery);
    const propertiesPromises = querySnapshot.docs.map(async (doc) => {
      const property: DBPropertyType = {
        id: doc.id,
        ...(doc.data() as Omit<DBPropertyType, "id">),
      };
      const res = await getFormattedProperty(property, propertyImagesLimit);
      if (!res.ok) return null;
      return res.property;
    });
    const propertiesWithNulls = await Promise.all(propertiesPromises);
    const properties = propertiesWithNulls.filter(
      (property): property is PropertyType => property !== null,
    );
    return {
      ok: true,
      properties,
    };
  } catch (error) {
    return {
      ok: false,
      properties: [],
    };
  }
};
