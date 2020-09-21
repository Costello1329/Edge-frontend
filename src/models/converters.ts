import {SmallJob, Job} from "./job";
import {
  FullVacancy,
  Vacancy,
  VacancyIndustry,
  VacancyLevel,
  VacancySkill, 
  VacancyStack
} from "./vacancy";



export const smallJobToVacancy =
  (job: SmallJob): Vacancy => ({
    guid: job.id,
    premium: job.premium,
    location: job.company.location,
    companyName: job.company.name,
    salary: job.offer.salary,
    level: job.candidate.level as keyof typeof VacancyLevel,
    skill: job.candidate.skill as keyof typeof VacancySkill,
    stack: job.candidate.stack as (keyof typeof VacancyStack)[],
    remote: job.company.remote
  });

export const jobToFullVacancy =
  (job: Job): FullVacancy => ({
    guid: job.id,
    premium: job.premium,
    location: job.company.location,
    company: {
      ... job.company,
      industry: job.company.industry as keyof typeof VacancyIndustry
    },
    salary: job.offer.salary,
    level: job.candidate.level as keyof typeof VacancyLevel,
    skill: job.candidate.skill as keyof typeof VacancySkill,
    stack: job.candidate.stack as (keyof typeof VacancyStack)[],
    remote: job.company.remote,
    description: job.offer.description,
    contact: job.contact
  });

export const fullVacancyToJob =
  (vacancy: Omit<FullVacancy, "guid">): Omit<Job, "id"> => ({
    premium: vacancy.premium,
    company: {
      ... vacancy.company,
      location: vacancy.location,
      remote: vacancy.remote
    },
    offer: {
      salary: vacancy.salary,
      description: vacancy.description
    },
    candidate: {
      level: vacancy.level,
      skill: vacancy.skill,
      stack: vacancy.stack
    },
    contact: vacancy.contact
  });
