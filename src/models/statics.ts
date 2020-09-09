import {getRandomGuid} from "../utils/guid";
import {Vacancy, FullVacancy} from "./vacancy";



export const vacancies: Vacancy[] = [{
  guid: getRandomGuid(),
  companyName: "Google",
  premium: true,
  location: {
    city: "London",
    country: "England"
  },
  salary: { from: 3000, to: 5000 },
  level: "c4798ed3ba49-vacancy-level-senior",
  skill: "e04b4da0b44e-vacancy-skill-fullstack",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
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
  level: "3a1d646fda31-vacancy-level-junior",
  skill: "e04b4da0b44e-vacancy-skill-fullstack",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
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
  level: "c4798ed3ba49-vacancy-level-senior",
  skill: "3e9c87ebb4c8-vacancy-skill-backend",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
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
  level: "bf320372b261-vacancy-level-middle",
  skill: "90b207451932-vacancy-skill-desktop",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
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
  level: "372dfdd0a4fc-vacancy-level-cto",
  skill: "d1e069f747e6-vacancy-skill-security-engineer",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
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
  level: "bf320372b261-vacancy-level-middle",
  skill: "e04b4da0b44e-vacancy-skill-fullstack",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "2e804417a4bc-vacancy-stack-ruby"
  ],
  remote: true
}];

export const fullVacancy: FullVacancy = {
  guid: getRandomGuid(),
  premium: true,
  contact: {
    email: "mail@mail.ru",
    phone: "+7(915)042-08-03",
    telegram: "konstantinleladze"
  },
  location: {
    country: "Russia",
    city: "Moscow"
  },
  company: {
    name: "Mail",
    industry: "656e0d8abc55-vacancy-industry-bank",
    website: "https://mail.ru"
  },
  salary: {
    from: 3000,
    to: 4000
  },
  level: "372dfdd0a4fc-vacancy-level-cto",
  skill: "e04b4da0b44e-vacancy-skill-fullstack",
  stack: [
    "2bb341389cd8-vacancy-stack-java",
    "578e56dbedaf-vacancy-stack-python"
  ],
  remote: true,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
    Praesent sed semper dui. Sed interdum nunc pulvinar, accumsan \
    purus vel, fringilla massa. Aenean ex felis, euismod vel \n tortor ut, finibus \
    accumsan lectus. Phasellus et lorem ultricies, maximus magna in, aliquam nula. \
    Sed sit amet molestie dui, vel sollicitudin nisl. Pellentesque vitae dignissim \
    enim. Aenean tempus porta tellus. Ut venenatis iaculis ornare. Donec felis \
    felis, pretium at ultrices non, luctus nec elit. Suspendisse nec efficitur \
    felis. \
    Proin sed ultricies ex, ac accumsan purus. Vivamus non mi sit amet nisl \
    porttitor tincidunt in id ex. Nulla ac commodo mi, quis dignissim nibh. Fusce."
}
