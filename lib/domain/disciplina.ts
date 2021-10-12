export class Disciplina {
  codigo: string;
  codigoDepartamento: string;
  nome: string;
  descricao: string;
  codigosDependencias: string[];
  
  constructor(
    codigo: string,
    codigoDepartamento: string,
    nome: string,
    descricao: string,
    codigosDependencias: string[]
  ) {
    this.codigo = codigo;
    this.codigoDepartamento = codigoDepartamento;
    this.nome = nome;
    this.descricao = descricao;
    this.codigosDependencias = codigosDependencias;
  } 
}