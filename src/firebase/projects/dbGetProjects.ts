import { FIREBASE_DB } from "@firebase/config";
import { FIREBASE_COLLECTIONS } from "@firebase/constants";
import type { DBProjectType, ProjectType } from "@lib/types/ProjectTypes";
import { collection, getDocs, limit, query } from "firebase/firestore/lite";
import type { QueryConstraint } from "firebase/firestore/lite";
import { getFormattedProject } from "./getFormattedProject";

export const dbGetProjects = async ({
  projectsLimit
}: {
  projectsLimit?: number;
} = {}) => {
  try {
    const collectionRef = collection(
      FIREBASE_DB,
      FIREBASE_COLLECTIONS.projects,
    );
    const queryConstraints: QueryConstraint[] = [];
    if (projectsLimit) {
      queryConstraints.push(limit(projectsLimit));
    }
    const projectsQuery = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(projectsQuery);
    const projectsPromises = querySnapshot.docs.map(async (doc) => {
      const project: DBProjectType = {
        id: doc.id,
        ...(doc.data() as Omit<DBProjectType, "id">),
      }
      const res = await getFormattedProject(project)
      if (!res.ok) return null
      return res.project
    });
    const projectsWithNulls = await Promise.all(projectsPromises);
    const projects = projectsWithNulls.filter(
      (project): project is ProjectType => project !== null,
    );
    return {
      ok: true,
      projects,
    };
  } catch (error) {
    return {
      ok: false,
      projects: [],
    };
  }
};