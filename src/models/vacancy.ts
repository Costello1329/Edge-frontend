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
  "4085f067-41cf-4be4-af8e-581f00dd5bd7" = "Intern",
  "39f35af9-52e5-454c-9271-3a1d646fda31" = "Junior",
  "e8508f41-8aca-470d-94d0-bf320372b261" = "Middle",
  "ab41d5a6-8913-48d1-be4a-c4798ed3ba49" = "Senior",
  "68f5edd7-64c3-4c84-b57e-372dfdd0a4fc" = "CTO"
}

export enum VacancySkill {
  "b8f440eb-1c6a-46b1-ab17-25d0323d6b8b" = "Frontend",
  "e1c04a4a-7385-48a5-8006-3e9c87ebb4c8" = "Backend",
  "078d4acd-ec10-4581-b8e5-e04b4da0b44e" = "Fullstack",
  "57392484-0f62-4b37-9646-61d9b77ab3f8" = "Dev Ops",
  "bd08418e-3f08-4068-8474-7a5ed5d51eea" = "Android",
  "a967a6c3-5291-4b3a-b539-fcad3d6232fa" = "iOS",
  "b966c196-34a4-48f0-bd26-f73eca194f44" = "Mobile",
  "3267fa50-5e65-4f18-a70a-90b207451932" = "Desktop",
  "677d9570-fdd0-43cd-a2b1-fb7b632988d7" = "Data Science",
  "39d717bf-abf0-443e-adc5-d1e069f747e6" = "Security Engineer"
}

export enum VacancyStack {
  "b56b1348-936d-41a5-9b88-2bb341389cd8" = "Java",
  "44a20df4-eaec-48bf-b432-578e56dbedaf" = "Python",
  "dcf44e32-a21b-4126-91b0-2e804417a4bc" = "Ruby",
  "5e93839b-5041-4c22-a589-825d56e49e89" = "cURL",
  "d91b936b-c3c9-4ebd-9666-e9d784d45648" = "Node JS"
}

export enum VacancyIndustry {
  "668be5a8-96e6-4024-a030-f1989f064217" = "Data Science",
  "57988348-a3ef-4783-beed-656e0d8abc55" = "Bank",
  "af555dae-0584-43bb-a667-dd20bbc85fef" = "Enterprise"
}
