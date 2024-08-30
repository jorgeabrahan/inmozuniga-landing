import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { FIREBASE_STORAGE } from '../config'

export const storageGetPropertyImages = async (
  propertyId: string, imagesLimit?: number
): Promise<{ ok: boolean; images: string[] }> => {
  try {
    const reference = ref(FIREBASE_STORAGE, `img/propiedades/${propertyId}`)
    const res = await listAll(reference)
    const items = imagesLimit ? res.items.slice(0, imagesLimit) : res.items;
    const urlPromises = items.map((itemRef) => getDownloadURL(itemRef));
    const urls = await Promise.all(urlPromises)
    return {
      ok: true,
      images: urls
    }
  } catch (error) {
    return {
      ok: false,
      images: []
    }
  }
}
