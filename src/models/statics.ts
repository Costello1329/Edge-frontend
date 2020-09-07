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
  level: "ab41d5a6-8913-48d1-be4a-c4798ed3ba49",
  skill: "078d4acd-ec10-4581-b8e5-e04b4da0b44e",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
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
  level: "39f35af9-52e5-454c-9271-3a1d646fda31",
  skill: "078d4acd-ec10-4581-b8e5-e04b4da0b44e",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
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
  level: "ab41d5a6-8913-48d1-be4a-c4798ed3ba49",
  skill: "e1c04a4a-7385-48a5-8006-3e9c87ebb4c8",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
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
  level: "e8508f41-8aca-470d-94d0-bf320372b261",
  skill: "3267fa50-5e65-4f18-a70a-90b207451932",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
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
  level: "68f5edd7-64c3-4c84-b57e-372dfdd0a4fc",
  skill: "39d717bf-abf0-443e-adc5-d1e069f747e6",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
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
  level: "e8508f41-8aca-470d-94d0-bf320372b261",
  skill: "078d4acd-ec10-4581-b8e5-e04b4da0b44e",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "dcf44e32-a21b-4126-91b0-2e804417a4bc"
  ],
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
    industry: "57988348-a3ef-4783-beed-656e0d8abc55",
    website: "https://mail.ru"
  },
  salary: {
    from: 3000,
    to: 4000
  },
  level: "68f5edd7-64c3-4c84-b57e-372dfdd0a4fc",
  skill: "078d4acd-ec10-4581-b8e5-e04b4da0b44e",
  stack: [
    "b56b1348-936d-41a5-9b88-2bb341389cd8",
    "44a20df4-eaec-48bf-b432-578e56dbedaf"
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
