import {Guid} from "../utils/guid";



export interface Vacancy {
  guid: Guid,
  companyName: string,
  jobTitle: string,
  skillLevel: string,
  stack: string,
  moneySummary: string,
  location: string
};
