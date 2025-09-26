
import { ClasseSanguinea, CondicaoNome } from './types';

export const MAX_ATTRIBUTE_POINTS = 3;
export const MIN_ATTRIBUTE_VALUE = -1;
export const MAX_ATTRIBUTE_VALUE = 3;

export const INITIAL_PERICIAS_COUNT = 2;

const sanguessugaAbilities = {
    1: { title: "Droga Nível 1", description: "1 dose/dia: Usa o Poder Nível 1 do tipo consumido." },
    3: { title: "Droga Nível 3", description: "1 dose/dia: Usa o Poder Nível 3 do tipo consumido." },
    5: { title: "Droga Nível 5", description: "2 doses/dia: Usa o Poder Nível 5 do tipo consumido." },
};

export const ABILITIES_DATA: Record<string, Record<number, { title: string; description: string }>> = {
  [ClasseSanguinea.None]: {},
  [ClasseSanguinea.Bruto]: {
    1: { title: "Poder de Nível 1", description: "+2 em testes de Corpo." },
    3: { title: "Poder de Nível 3", description: "Começa combate com +1 Ponto de Superioridade." },
    5: { title: "Poder de Nível 5", description: "Vantagem em testes de Corpo (rola 2d6, usa o maior)." },
  },
  [ClasseSanguinea.Estancador]: {
    1: { title: "Poder de Nível 1", description: "Cura 1 nível de Condição em aliado (apenas nível 1)." },
    3: { title: "Poder de Nível 3", description: "Pode emprestar sua proficiência para um aliado." },
    5: { title: "Poder de Nível 5", description: "Impede um aliado de receber uma condição de Nível 1." },
  },
  [ClasseSanguinea.Espinhoso]: {
    1: { title: "Poder de Nível 1", description: "Pode causar Sangramento em si para obter bônus." },
    3: { title: "Poder de Nível 3", description: "Imune a Sangramento externo." },
    5: { title: "Poder de Nível 5", description: "Usa poderes sem receber Sangramento em troca." },
  },
  [ClasseSanguinea.Refinador]: {
    1: { title: "Poder de Nível 1", description: "Ganha proficiência ao causar Sangramento." },
    3: { title: "Poder de Nível 3", description: "Cura Sangramento (mesmo Nível 2) em outros." },
    5: { title: "Poder de Nível 5", description: "Concede vantagem ao custo de Sangramento alheio (gera Exaustão sem permissão)." },
  },
  [ClasseSanguinea.Estagnador]: {
    1: { title: "Poder de Nível 1", description: "+2 para não ser percebido e ignora efeitos de Sangramento de nível 1." },
    3: { title: "Poder de Nível 3", description: "Cura Desespero (mesmo Nível 2)." },
    5: { title: "Poder de Nível 5", description: "Ignora efeitos de Sangramento, Exaustão e Desespero de nível 1." },
  },
  [ClasseSanguinea.Acelerador]: {
    1: { title: "Poder de Nível 1", description: "+2 para perceber seres com sangue, rastrear e detectar mentiras." },
    3: { title: "Poder de Nível 3", description: "Identifica tipo sanguíneo e poderes de um alvo." },
    5: { title: "Poder de Nível 5", description: "Ganha Vantagem e pode prever a próxima ação de um alvo." },
  },
  [ClasseSanguinea.Sanguessuga_AB_Plus]: sanguessugaAbilities,
  [ClasseSanguinea.Sanguessuga_AB_Minus]: sanguessugaAbilities,
  [ClasseSanguinea.Puro]: {
    1: { title: "Perícia Adicional", description: "Começa com 3 perícias no total." },
    3: { title: "Perícia Adicional", description: "Ganha +1 Perícia adicional (totalizando 5)." },
    5: { title: "Proficiência Mestre", description: "Proficiência torna-se +6 (em vez de +4)." },
  },
};

export const CONDICOES_DATA: Record<CondicaoNome, { levels: Record<number, string> }> = {
  [CondicaoNome.Sangramento]: {
    levels: {
      1: "-1 em todos os testes de Corpo.",
      2: "Desvantagem em ações físicas contínuas.",
      3: "Colapso físico. MORTE.",
    },
  },
  [CondicaoNome.Exaustao]: {
    levels: {
      1: "-1 em todos os testes de Mente.",
      2: "Não pode se beneficiar de perícias mentais.",
      3: "Colapso mental. MORTE.",
    },
  },
  [CondicaoNome.Desespero]: {
    levels: {
      1: "-1 em todos os testes de Carisma.",
      2: "-1 adicional em todos os testes de Mente (-2 total).",
      3: "Colapso espiritual. MORTE.",
    },
  },
  [CondicaoNome.Marcado]: {
    levels: {
      1: "Está sendo observado ou seguido.",
      2: "Atrai inimigos com mais facilidade ou prejudica rituais.",
      3: "Encontrado por uma entidade sobrenatural. MORTE.",
    },
  },
  [CondicaoNome.Corrompido]: {
    levels: {
      1: "Sussurros, visões, pesadelos.",
      2: "Pode perder o controle em momentos importantes ou agir impulsivamente.",
      3: "Perde a razão, alma consumida. MORTE.",
    },
  },
};

export const LEVEL_PROGRESSION = {
    2: { title: "Nova Perícia", description: "Ganha +1 nova Perícia." },
    4: { title: "Proficiência Aprimorada", description: "Bônus de proficiência torna-se +4." },
};