
export enum ClasseSanguinea {
  None = "Nenhuma",
  Bruto = "Bruto (A+)",
  Estancador = "Estancador (A-)",
  Espinhoso = "Espinhoso (B+)",
  Refinador = "Refinador (B-)",
  Estagnador = "Estagnador (O+)",
  Acelerador = "Acelerador (O-)",
  Sanguessuga_AB_Plus = "Sanguessuga (AB+)",
  Sanguessuga_AB_Minus = "Sanguessuga (AB-)",
  Puro = "Puro (Sem Poder)",
}

export enum Atributo {
  Corpo = "Corpo",
  Mente = "Mente",
  Carisma = "Carisma",
}

export enum CondicaoNome {
  Sangramento = "Sangramento",
  Exaustao = "Exaustão",
  Desespero = "Desespero",
  Marcado = "Marcado",
  Corrompido = "Corrompido",
}

export interface Atributos {
  [Atributo.Corpo]: number;
  [Atributo.Mente]: number;
  [Atributo.Carisma]: number;
}

export interface Pericia {
  id: number;
  name: string;
}

export interface Condicao {
  name: CondicaoNome;
  level: number;
}

export enum ConsumedBloodType {
    None = "Nenhum",
    A_Plus = "A+",
    A_Minus = "A-",
    B_Plus = "B+",
    B_Minus = "B-",
}

export interface SanguessugaState {
    consumedType: ConsumedBloodType;
    doses: number;
}

export interface Equipment {
  arma: string;
  diversos: string;
  pericias: Record<number, string>;
}

export interface Character {
  name: string;
  level: number;
  classe: ClasseSanguinea;
  atributos: Atributos;
  pericias: Pericia[];
  condicoes: Condicao[];
  sanguessugaState: SanguessugaState;
  notes: string;
  imageUrl: string;
  equipment: Equipment;
}