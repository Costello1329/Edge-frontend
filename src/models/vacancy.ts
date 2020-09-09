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
    industry: keyof typeof VacancyIndustry,
    website: string
  },
  salary: {
    from: number,
    to: number
  },
  level: keyof typeof VacancyLevel,
  skill: keyof typeof VacancySkill,
  stack: (keyof typeof VacancyStack)[],
  remote: boolean,
  description: string
}

export enum VacancyLevel {
  "581f00dd5bd7-vacancy-level-intern" = "Intern",
  "3a1d646fda31-vacancy-level-junior" = "Junior",
  "bf320372b261-vacancy-level-middle" = "Middle",
  "c4798ed3ba49-vacancy-level-senior" = "Senior",
  "372dfdd0a4fc-vacancy-level-cto" = "CTO"
}

export enum VacancySkill {
  "25d0323d6b8b-vacancy-skill-frontend" = "Frontend",
  "3e9c87ebb4c8-vacancy-skill-backend" = "Backend",
  "e04b4da0b44e-vacancy-skill-fullstack" = "Fullstack",
  "61d9b77ab3f8-vacancy-skill-dev-ops" = "Dev Ops",
  "7a5ed5d51eea-vacancy-skill-android" = "Android",
  "fcad3d6232fa-vacancy-skill-ios" = "iOS",
  "f73eca194f44-vacancy-skill-mobile" = "Mobile",
  "90b207451932-vacancy-skill-desktop" = "Desktop",
  "fb7b632988d7-vacancy-skill-data-science" = "Data Science",
  "d1e069f747e6-vacancy-skill-security-engineer" = "Security Engineer"
}

export enum VacancyStack {
  "2bb341389cd8-vacancy-stack-java" = "Java",
  "578e56dbedaf-vacancy-stack-python" = "Python",
  "2e804417a4bc-vacancy-stack-ruby" = "Ruby",
  "825d56e49e89-vacancy-stack-curl" = "cURL",
  "e9d784d45648-vacancy-stack-node-js" = "Node JS"
}

export enum VacancyIndustry {
  "f1989f064217-vacancy-industry-data-science" = "Data Science",
  "656e0d8abc55-vacancy-industry-bank" = "Bank",
  "dd20bbc85fef-vacancy-industry-enterprise" = "Enterprise"
}
