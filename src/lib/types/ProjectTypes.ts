import type {
  ProjectLotModels,
  ProjectLotTypes,
  ProjectStageTypes,
} from "@lib/enums";

type ProjectLot = {
  financiar: string;
  tipo: ProjectLotTypes;
  cuota: string;
  prima: string;
  precioMetro: string;
  costoTotal: string;
  precioVara: string;
  modelo: ProjectLotModels;
  habitaciones: string;
  varas: string;
  banios: string;
  metros: string;
};

type ProjectStage = {
  tipo: ProjectStageTypes;
  nombre: string;
  lotes: ProjectLot[];
};

export type ProjectType = {
  id: string;
  description: string;
  location: string;
  media: {
    video: string;
    image: string;
  };
  name: string;
  income: number;
  stages: ProjectStage[];
};

export type DBProjectType = {
  id: string;
  descripcion: string;
  ubicacion: string;
  video: string;
  nombre: string;
  ingreso: string;
  etapas: ProjectStage[];
};
