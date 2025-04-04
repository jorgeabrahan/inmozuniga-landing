import type { TypeCosmicProject } from "@lib/types/Database";
import { cosmic } from "src/config/cosmic";

export class ServiceProjects {
  static async getProjects({
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  } = {}): Promise<{ ok: boolean; data: TypeCosmicProject[]; total: number }> {
    try {
      const queryParams: any = {
        type: "projects",
      };
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
