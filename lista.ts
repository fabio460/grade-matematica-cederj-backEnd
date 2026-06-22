export type DisciplinaType = {
  id: string;
  nome: string;
  codigo_disciplina: string;
  tipo: string;
  carga_horaria: number;
  periodo: number;
  grupo: string;
  semestre: number;
  horario: string;
  preRequisitos: string[];
  disciplinaId: string;
  periodoId: string;
};
const listaDeDisciplinas: DisciplinaType[] = [
 
]