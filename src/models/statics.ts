import {getRandomGuid} from "../utils/guid";
import {Vacancy} from "./vacancy";



export const vacancies: Vacancy[] = [{
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "JS, TS, React, SCSS, SASS, Rust, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Moscow"
}, {
  guid: getRandomGuid(),
  companyName: "Yandex",
  jobTitle: "Backend engineer",
  skillLevel: "Junior",
  stack: "Blowjob, Anal",
  moneySummary: "1 500 – 2 500 $",
  location: "London"
}, {
  guid: getRandomGuid(),
  companyName: "Сто семнадцать и два",
  jobTitle: "Callback engineer",
  skillLevel: "CTO",
  stack: "Autohotkey",
  moneySummary: "40 000 – 50 000 $",
  location: "Prague"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Greece"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Georgia"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "JS, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Ukraine"
}];
