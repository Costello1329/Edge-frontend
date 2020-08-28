import {Guid} from "../utils/guid";



export interface Vacancy {
  guid: Guid,
  companyName: string,
  jobTitle: VacancySkill,
  skillLevel: VacancyLevel,
  stack: string,
  moneySummary: string,
  location: string
};

export interface FullVacancy extends Vacancy {
  description: string
}

export enum VacancyLevel {
  Junior = "vacancyLevelJunior",
  Middle = "vacancyLevelMiddle",
  Senior = "vacancyLevelSenior",
  CTO = "vacancyLevelCTO"
};

export enum VacancySkill {
  Frontend = "vacancySkillFrontend",
  Backend = "vacancySkillBackend",
  Fullstack = "vacancySkillFullstack"
};
