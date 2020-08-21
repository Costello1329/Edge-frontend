import React from "react";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";
import {getRandomGuid} from "../../utils/guid";
import {localization} from "../../services/localization";
import Logo1C from "../../../assets/svg/companies/onec.svg";
import LogoAlpha from "../../../assets/svg/companies/alpha.svg";
import LogoKaspersky from "../../../assets/svg/companies/kaspersky.svg";
import LogoMail from "../../../assets/svg/companies/mail.svg";
import LogoSberbank from "../../../assets/svg/companies/sberbank.svg";
import LogoYandex from "../../../assets/svg/companies/yandex.svg";
import {preferences} from "../../services/preferences";

import "./styles.scss";



interface HomePageProps {
  vacanciesPageUrl: string
};

export const HomePage: React.FunctionComponent<HomePageProps> =
  (props: HomePageProps): JSX.Element =>
    <React.Fragment>
      <MainLayer
        vacanciesPageUrl = {props.vacanciesPageUrl}
        companyLogoSrcs = {[
          <LogoKaspersky/>,
          <Logo1C/>,
          <LogoAlpha/>,
          <LogoYandex/>,
          <LogoMail/>,
          <LogoSberbank/>
        ]}
      />
      <VacanciesLayer
        button = {{
          text: localization.localize("watchAllVacancies"),
          url: props.vacanciesPageUrl
        }}
        vacancies = {[{
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
        }]}
      />
      <TelegramLayer link = {preferences.telegramGroup}/>
    </React.Fragment>;
