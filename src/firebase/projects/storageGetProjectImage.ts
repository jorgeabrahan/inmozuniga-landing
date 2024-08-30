import { getDownloadURL, ref } from 'firebase/storage'
import { FIREBASE_STORAGE } from '../config'

export const storageGetProjectImage = async (
  projectId: string
): Promise<{ ok: boolean; image: string }> => {
  try {
    const reference = ref(FIREBASE_STORAGE, `img/proyectos/${projectId}`)
    const url = await getDownloadURL(reference)
    return {
      ok: true,
      image: url
    }
  } catch (error) {
    return {
      ok: false,
      image: '  '
    }
  }
}
