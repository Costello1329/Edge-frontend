import React from "react";
import Materialize from "materialize-css"; 
import {discard} from "../../utils/Discard";
import {Header} from "../bars/header";
import {Footer} from "../bars/footer";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";
import {getRandomGuid} from "../../utils/guid";
import {preferences} from "../../services/preferences";
import telegramIcon from '@iconify/icons-mdi/telegram';
import {localization} from "../../services/localization";
import {LocaleType} from "../../services/localization/locales";
import {Dropdown} from "../dropdown";
import Logo1C from "../../../assets/svg/companies/onec.svg";
import LogoAlpha from "../../../assets/svg/companies/alpha.svg";
import LogoKaspersky from "../../../assets/svg/companies/kaspersky.svg";
import LogoMail from "../../../assets/svg/companies/mail.svg";
import LogoSberbank from "../../../assets/svg/companies/sberbank.svg";
import LogoYandex from "../../../assets/svg/companies/yandex.svg";

import "./styles.scss";



export class App
extends React.Component {
  public readonly componentDidMount = (): void =>
    discard(setTimeout((): void => {
      Materialize.AutoInit();
      M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    }));

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <Dropdown
        id = "dropdown-lang"
        options = {[{
          text: localization.localize("russian"),
          callback: (): void => localization.setLocale(LocaleType.ru_RU)
        }, {
          text: localization.localize("english"),
          callback: (): void => localization.setLocale(LocaleType.en_GB)
        }]}
      />
      <Header icons = {[{
        /// telegramIcon package has not been updated
        /// yet for new IconofyIcon support.
        data: { icon: telegramIcon as any, height: 29 },
        callback: (): void => discard(window.open(preferences.telegramGroup)),
        dataTarget: undefined,
        class: undefined
      }, {
        data: "language",
        callback: (): void => {},
        dataTarget: "dropdown-lang",
        class: "dropdown-trigger"
      }]}/>
      <main>
        <MainLayer companyLogoSrcs = {[
          <LogoKaspersky/>,
          <Logo1C/>,
          <LogoAlpha/>,
          <LogoYandex/>,
          <LogoMail/>,
          <LogoSberbank/>
        ]}/>
        <VacanciesLayer vacancies = {[{
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
        }]}/>
        <TelegramLayer link = {preferences.telegramGroup}/>
      </main>
      <Footer/>
    </React.Fragment>;
};
