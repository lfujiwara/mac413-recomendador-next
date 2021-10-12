import React, { useEffect } from "react";

import { DisciplinaDTO } from "../models/dto/disciplina.dto";
import db from "../db.json";

export type GerenciadorDisciplinasCursadasView = {
  disciplinasCursadas: DisciplinaDTO[];
  disciplinaFoiCursada: (codigo: string) => boolean;

  termoDeBuscaDisciplinas: string;
  atualizarTermoDeBuscaDisciplinas: (termoDeBusca: string) => void;
  disciplinasAExibir: DisciplinaDTO[];

  adicionarDisciplina: (codigoDisciplina: string) => Promise<void>;
  removerDisciplina: (codigoDisciplina: string) => Promise<void>;
};

const GerenciadorDisciplinasCursadasViewContext =
  React.createContext<GerenciadorDisciplinasCursadasView>(undefined as any);

export const useGerenciadorDisciplinasCursadasView = () =>
  React.useContext(GerenciadorDisciplinasCursadasViewContext);

export const GerenciadorDisciplinasCursadasViewProvider = ({
  children,
}: {
  children?: any;
}) => {
  const [state, setState] = React.useState<
    Omit<
      GerenciadorDisciplinasCursadasView,
      | "adicionarDisciplina"
      | "removerDisciplina"
      | "atualizarTermoDeBuscaDisciplinas"
    >
  >({
    disciplinasAExibir: db.disciplinas,
    disciplinasCursadas: [],
    termoDeBuscaDisciplinas: "",
    disciplinaFoiCursada: () => false,
  });

  const valueToProvide: GerenciadorDisciplinasCursadasView = {
    ...state,
    atualizarTermoDeBuscaDisciplinas: (termoDeBusca: string) => {
      setState({ ...state, termoDeBuscaDisciplinas: termoDeBusca });
    },
    adicionarDisciplina: async (codigoDisciplina: string) => {
      const disciplina = db.disciplinas.find(
        (disciplina) => disciplina.codigo === codigoDisciplina
      );
      if (disciplina)
        setState({
          ...state,
          disciplinasCursadas: state.disciplinasCursadas.concat(disciplina),
        });
    },
    removerDisciplina: async (codigoDisciplina: string) => {
      setState({
        ...state,
        disciplinasCursadas: state.disciplinasCursadas.filter(
          (disciplina) => disciplina.codigo !== codigoDisciplina
        ),
      });
    },
  };

  useEffect(() => {
    setState({
      ...state,
      disciplinasAExibir: db.disciplinas.filter((disciplina) => {
        if (state.termoDeBuscaDisciplinas === "") return true;
        const nomeDisciplina = disciplina.nome.toLowerCase();
        const codDisciplina = disciplina.codigo.toLowerCase();
        return (
          nomeDisciplina.includes(
            state.termoDeBuscaDisciplinas.toLowerCase()
          ) ||
          codDisciplina.includes(state.termoDeBuscaDisciplinas.toLowerCase())
        );
      }),
    });
  }, [state.termoDeBuscaDisciplinas]);

  useEffect(() => {
    const set = new Set<string>(state.disciplinasCursadas.map((d) => d.codigo));
    setState({
      ...state,
      disciplinaFoiCursada: (codigo: string) => set.has(codigo),
    });
  }, [state.disciplinasCursadas]);

  return (
    <GerenciadorDisciplinasCursadasViewContext.Provider value={valueToProvide}>
      {children}
    </GerenciadorDisciplinasCursadasViewContext.Provider>
  );
};
