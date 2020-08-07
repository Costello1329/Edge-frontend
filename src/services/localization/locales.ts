export enum LocaleType {
  ru_RU = "ru_RU",
  // en_GB = "en_GB"
};

export interface Locale {
  copyrightText: string,
  allRightsReserved: string,
  mainLayerTitle: string,
  mainLayerParagraphs: string[],
  mainLayerCompaniesTitle: string,
  viewVacancies: string,
  putVacancy: string,
  joinOurTelegram: string
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
  joinOurTelegram: "Присоединяйтесь к нам в Telegram:"
};

// export const en_GB: Locale = {};
