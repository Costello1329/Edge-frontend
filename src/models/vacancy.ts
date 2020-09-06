import {Guid} from "../utils/guid";



export type Vacancy = Pick<FullVacancy,
  "guid" |
  "premium" |
  "location" |
  "salary" |
  "level" |
  "skill" |
  "stack" |
  "remote"
> & {
  companyName: FullVacancy["company"]["name"]
};

export interface FullVacancy {
  guid: Guid,
  premium: boolean,
  contact: {
    email: string,
    phone: string,
    telegram: string
  },
  location: {
    country: string,
    city: string
  },
  company: {
    name: string,
    industry: VacancyIndustry,
    website: string
  },
  salary: {
    from: number,
    to: number
  },
  level: VacancyLevel,
  skill: VacancySkill,
  stack: VacancyStack[],
  remote: boolean,
  description: string
}

export enum VacancyLevel {
  Intern = "vacancyLevelIntern",
  Junior = "vacancyLevelJunior",
  Middle = "vacancyLevelMiddle",
  Senior = "vacancyLevelSenior",
  CTO = "vacancyLevelCTO"
}

export enum VacancySkill {
  Frontend = "vacancySkillFrontend",
  Backend = "vacancySkillBackend",
  Fullstack = "vacancySkillFullstack",
  DevOps = "vacancySkillDevOps",
  Android = "vacancySkillAndroid",
  iOS = "vacancySkilliOS",
  Mobile = "vacancySkillMobile",
  Desktop = "vacancySkillDesktop",
  DataScience = "vacancySkillDataScience",
  SecurityEngineer = "vacancySkillSecurityEngineer"
}

export enum VacancyStack {
  Java = "vacancyStackJava",
  Python = "vacancyStackPython",
  Ruby = "vacancyStackRuby",
  cURL = "vacancyStackCURL"
}

export enum VacancyIndustry {
  DataScience = "vacancyIndustryDataScience",
  Bank = "vacancyIndustryBank",
  Enterprise = "vacancyIndustryEnterprise"
}
