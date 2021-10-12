import { DepartamentoDTO } from "../models/dto/departamento.dto";
import React from "react";
import db from "../db.json";
export type GerenciadorDepartamentosView = {
  departamentosSelecionados: DepartamentoDTO[];
  departamentoFoiSelecionado: (codigo: string) => boolean;

  termoDeBuscaDepartamentos: string;
  atualizarTermoDeBuscaDepartamentos: (termo: string) => void;
  departamentosAExibir: DepartamentoDTO[];

  adicionarDepartamento: (codigoDepartamento: string) => void;
  removerDepartamento: (codigoDepartamento: string) => void;
};

const GerenciadorDepartamentosViewContext =
  React.createContext<GerenciadorDepartamentosView>(undefined as any);

export const useGerenciadorDepartamentosView = () =>
  React.useContext(GerenciadorDepartamentosViewContext);

export const GerenciadorDepartamentosViewProvider = ({
  children,
}: {
  children?: any;
}) => {
  type StateType = Omit<
    GerenciadorDepartamentosView,
    | "atualizarTermoDeBuscaDepartamentos"
    | "adicionarDepartamento"
    | "removerDepartamento"
  >;
  const [state, setState] = React.useState<StateType>({
    departamentoFoiSelecionado: () => false,
    termoDeBuscaDepartamentos: "",
    departamentosSelecionados: [],
    departamentosAExibir: db.departamentos,
  });

  const valueToProvide: GerenciadorDepartamentosView = {
    ...state,
    atualizarTermoDeBuscaDepartamentos: (termo) =>
      setState({ ...state, termoDeBuscaDepartamentos: termo }),
    adicionarDepartamento: (codigoDepartamento) => {
      const departamento = db.departamentos.find(
        (departamento) => departamento.codigo === codigoDepartamento
      );
      if (departamento) {
        setState({
          ...state,
          departamentosSelecionados: [
            ...state.departamentosSelecionados,
            departamento,
          ],
        });
      }
    },
    removerDepartamento: (codigoDepartamento) => {
      setState({
        ...state,
        departamentosSelecionados: state.departamentosSelecionados.filter(
          (departamentoSelecionado) =>
            departamentoSelecionado.codigo !== codigoDepartamento
        ),
      });
    },
  };

  React.useEffect(() => {
    setState({
      ...state,
      departamentosAExibir: db.departamentos.filter((departamento) =>
        departamento.codigo
          .toLowerCase()
          .includes(state.termoDeBuscaDepartamentos.toLowerCase())
      ),
    });
  }, [state.termoDeBuscaDepartamentos]);

  React.useEffect(() => {
    const set = new Set(state.departamentosSelecionados.map((d) => d.codigo));
    setState({
      ...state,
      departamentoFoiSelecionado: (codigo) => set.has(codigo),
    });
  }, [state.departamentosSelecionados]);

  return (
    <GerenciadorDepartamentosViewContext.Provider value={valueToProvide}>
      {children}
    </GerenciadorDepartamentosViewContext.Provider>
  );
};
