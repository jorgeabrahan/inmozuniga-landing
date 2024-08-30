import type { DBProjectType, ProjectType } from "@lib/types/ProjectTypes"
import { storageGetProjectImage } from "./storageGetProjectImage"

const getSanitizedProject = (project: DBProjectType, image: string): ProjectType => ({
  id: project.id,
  name: project.nombre,
  description: project.descripcion,
  location: project.ubicacion,
  media: {
    video: project.video,
    image
  },
  income: Number(project.ingreso),
  stages: project.etapas
})

export const getFormattedProject = async (project: DBProjectType) => {
  try {
    const res = await storageGetProjectImage(project.id)
    if (!res.ok) return { ok: false, project: null }
    return {
      ok: true,
      project: getSanitizedProject(project, res.image)
    }
  } catch (error) {
    return {
      ok: false,
      project: null
    }
  }
}