import type { DBPropertyType } from '../../lib/types/PropertyTypes'
import { storageGetPropertyImages } from './storageGetPropertyImages'

const getSanitizedProperty = (property: DBPropertyType, images: string[]) => ({
  id: property.id,
  name: property.nombre,
  description: property.descripcion,
  category: property.categoria,
  state: property.estado,
  location: property.ubicacion,
  measurements: {
    yards: Number(property.varas),
    meters: Number(property.metros)
  },
  media: {
    video: property.video,
    images: images
  },
  price: {
    total: Number(property.costoTotal),
    fee: Number(property.cuota)
  },
  traits: {
    bedrooms: Number(property.dormitorios),
    levels: Number(property.niveles),
    parkingLots: Number(property.estacionamientos),
    bathrooms: Number(property.banios)
  }
})

export const getFormattedProperty = async (property: DBPropertyType, imagesLimit?: number) => {
  try {
    const res = await storageGetPropertyImages(property.id, imagesLimit)
    if (!res.ok) return { ok: false, property: null }
    return {
      ok: true,
      property: getSanitizedProperty(property, res.images)
    }
  } catch (error) {
    return {
      ok: false,
      property: null
    }
  }
}
