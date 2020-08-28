import {getRandomGuid} from "../utils/guid";
import {Vacancy, VacancyLevel, VacancySkill, FullVacancy} from "./vacancy";



export const vacancies: Vacancy[] = [{
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: VacancySkill.Fullstack,
  skillLevel: VacancyLevel.Middle,
  stack: "JS, TS, React, SCSS, SASS, Rust, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Moscow"
}, {
  guid: getRandomGuid(),
  companyName: "Yandex",
  jobTitle: VacancySkill.Backend,
  skillLevel: VacancyLevel.Junior,
  stack: "Blowjob, Anal",
  moneySummary: "1 500 – 2 500 $",
  location: "London"
}, {
  guid: getRandomGuid(),
  companyName: "Сто семнадцать и два",
  jobTitle: VacancySkill.Frontend,
  skillLevel: VacancyLevel.CTO,
  stack: "Autohotkey",
  moneySummary: "40 000 – 50 000 $",
  location: "Prague"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: VacancySkill.Fullstack,
  skillLevel: VacancyLevel.Junior,
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Greece"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: VacancySkill.Backend,
  skillLevel: VacancyLevel.Middle,
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Georgia"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: VacancySkill.Fullstack,
  skillLevel: VacancyLevel.Senior,
  stack: "JS, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Ukraine"
}];

export const fullVacancy: FullVacancy = {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: VacancySkill.Fullstack,
  skillLevel: VacancyLevel.Junior,
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Greece",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
    Praesent sed semper dui. Sed interdum nunc pulvinar, accumsan \
    purus vel, fringilla massa. Aenean ex felis, euismod vel tortor ut, finibus \
    accumsan lectus. Phasellus et lorem ultricies, maximus magna in, aliquam nula. \
    Sed sit amet molestie dui, vel sollicitudin nisl. Pellentesque vitae dignissim \
    enim. Aenean tempus porta tellus. Ut venenatis iaculis ornare. Donec felis \
    felis, pretium at ultrices non, luctus nec elit. Suspendisse nec efficitur \
    felis. \
    Proin sed ultricies ex, ac accumsan purus. Vivamus non mi sit amet nisl \
    porttitor tincidunt in id ex. Nulla ac commodo mi, quis dignissim nibh. Fusce."
}
