import {getRandomGuid} from "../utils/guid";
import {Vacancy, VacancyLevel, VacancySkill, FullVacancy} from "./vacancy";



export const vacancies: Vacancy[] = [{
  guid: getRandomGuid(),
  companyName: "Google",
  premium: true,
  location: {
    city: "London",
    country: "England"
  },
  salary: { from: 3000, to: 5000 },
  level: VacancyLevel.Senior,
  skill: VacancySkill.Fullstack,
  stack: ["JS", "TS", "React", "SCSS", "SASS", "Rust", "Python"],
  remote: false
}, {
  guid: getRandomGuid(),
  companyName: "Yandex",
  premium: false,
  location: {
    city: "Moscow",
    country: "Russia"
  },
  salary: { from: 2000, to: 2500 },
  level: VacancyLevel.Middle,
  skill: VacancySkill.Fullstack,
  stack: ["JS", "TS", "React"],
  remote: false
}, {
  guid: getRandomGuid(),
  companyName: "Mail",
  premium: true,
  location: {
    city: "Moscow",
    country: "Russia"
  },
  salary: { from: 4000, to: 5000 },
  level: VacancyLevel.Senior,
  skill: VacancySkill.Backend,
  stack: ["Scala", "Java", "Yaml"],
  remote: false
}, {
  guid: getRandomGuid(),
  companyName: "1C",
  premium: false,
  location: {
    city: "Moscow",
    country: "Russia"
  },
  salary: { from: 1000, to: 2000 },
  level: VacancyLevel.Middle,
  skill: VacancySkill.Desktop,
  stack: ["1C"],
  remote: true
}, {
  guid: getRandomGuid(),
  companyName: "Сто семнадцать и два )))",
  premium: false,
  location: {
    city: "Moscow",
    country: "Russia"
  },
  salary: { from: 100, to: 100 },
  level: VacancyLevel.CTO,
  skill: VacancySkill.SecurityEngineer,
  stack: ["AutoHotkey", "Docker", "SSH"],
  remote: true
}, {
  guid: getRandomGuid(),
  companyName: "Allisto",
  premium: true,
  location: {
    city: "Moscow",
    country: "Russia"
  },
  salary: { from: 10000, to: 15000 },
  level: VacancyLevel.Middle,
  skill: VacancySkill.Fullstack,
  stack: ["Js", "Ts", "React", "Redux", "MobX", "Python", "Django", "SQL"],
  remote: true
}];

export const fullVacancy: FullVacancy = {
  guid: getRandomGuid(),
  premium: true,
  contact: {
    email: "mail@mail.ru",
    phone: "+7(915)042-08-03",
    telegram: "mainain"
  },
  location: {
    country: "Russia",
    city: "Moscow"
  },
  company: {
    name: "Mail",
    industry: "Desktop, mobile",
    website: "mail.ru"
  },
  salary: {
    from: 3000,
    to: 4000
  },
  level: VacancyLevel.CTO,
  skill: VacancySkill.Fullstack,
  stack: ["Java", "Docker"],
  remote: false,
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
