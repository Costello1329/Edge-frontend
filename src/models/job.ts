import {Guid} from "../utils/guid";



export type RawJob = Omit<Job, "id"> & { id: string };
export type RawSmallJob = Omit<SmallJob, "id"> & { id: string };

export type SmallJob =
  Omit<Job, "offer"> & { offer: Omit<Job["offer"], "description"> };

export interface Job {
  id: Guid,
  premium: boolean,
  company: {
    name: string,
    industry: string,
    website: string,
    location: {
        country: string,
        city: string
    },
    remote: boolean
  },
  candidate: {
    level: string,
    skill: string,
    stack: string[]
  },
  offer: {
    salary: {
        from: number,
        to: number
    },
    description: string
  },
  contact: {
    email: string,
    phone: string,
    telegram: string
  }
};
