import { DisciplinaDTO } from "../models/dto/disciplina.dto";

export type HomePageView = {
  departamentos: string[];
  disciplinasCursadas: DisciplinaDTO[];

  termoDeBuscaDisciplinas: string;
  disciplinasAExibir: DisciplinaDTO[];
  atualizarDisciplinasAExibir: () => void;

  termoDeBuscaDepartamentos: string;
  departamentosAExibir: DisciplinaDTO[];
  atualizarDepartamentosAExibir: () => void;

  adicionarDepartamento: (departamento: string) => Promise<void>;
  adicionarDisciplina: (codigoDisciplina: string) => Promise<void>;

  removerDepartamento: (departamento: string) => Promise<void>;
  removerDisciplina: (codigoDisciplina: string) => Promise<void>;
};