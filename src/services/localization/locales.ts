export enum LocaleType {
  ru_RU = "ru_RU",
  en_GB = "en_GB"
};

export interface Locale {
  copyrightText: string,
  allRightsReserved: string,
  mainLayerTitle: string,
  mainLayerParagraphs: string[],
  mainLayerCompaniesTitle: string,
  viewVacancies: string,
  putVacancy: string,
  joinOurTelegram: string,
  home: string,
  vacancies: string,
  vacancy: string
  watchAllVacancies: string,
  telegramGroupName: string,
  russian: string,
  english: string,
  filter: string,
  level: string,
  stack: string,
  location: string,
  salary: string,
  vacancyLevelJunior: string,
  vacancyLevelMiddle: string,
  vacancyLevelSenior: string,
  vacancyLevelCTO: string,
  vacancySkillFrontend: string,
  vacancySkillBackend: string,
  vacancySkillFullstack: string,
  all: string
};

export const ru_RU: Locale = {
  copyrightText: "© 2020 Allisto",
  allRightsReserved: "Все права защищены.",
  mainLayerTitle: "Кто мы",
  mainLayerParagraphs: [
    "Мы – крупный портал, размещающий лучшие вакансии в сфере IT. \
    Коллегам мы предоставляем доступ к лучшим предложениям на рынке, \
    рекрутерам – таргетированное размещение.",
    "Все вакансии проходят тщательную валидацию на предмет соответствия \
    правилам портала. Вакансии крупных компаний размещаются бесплатно \
    в кратчайшие сроки."
  ],
  mainLayerCompaniesTitle: "Нам доверяют",
  viewVacancies: "Посмотреть",
  putVacancy: "Разместить",
  joinOurTelegram: "Присоединяйтесь к нам в Telegram:",
  home: "Домой",
  vacancies: "Вакансии",
  vacancy: "Вакансия",
  watchAllVacancies: "Посмотреть все",
  telegramGroupName: "@sns_deanon",
  russian: "Русский",
  english: "English",
  filter: "Фильтр",
  level: "Уровень",
  stack: "Область",
  location: "Локация",
  salary: "Ставка",
  vacancyLevelJunior: "Junior",
  vacancyLevelMiddle: "Middle",
  vacancyLevelSenior: "Senior",
  vacancyLevelCTO: "CTO",
  vacancySkillFrontend: "Frontend",
  vacancySkillBackend: "Backend",
  vacancySkillFullstack: "Fullstack",
  all: "Все"
};

export const en_GB: Locale = {} as Locale;

// export const en_GB: Locale = {};
