import React from "react";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";
import {localization} from "../../services/localization";
// import Logo1C from "../../../assets/svg/companies/onec.svg";
// import LogoAlpha from "../../../assets/svg/companies/alpha.svg";
// import LogoKaspersky from "../../../assets/svg/companies/kaspersky.svg";
// import LogoMail from "../../../assets/svg/companies/mail.svg";
// import LogoSberbank from "../../../assets/svg/companies/sberbank.svg";
// import LogoYandex from "../../../assets/svg/companies/yandex.svg";
import {preferences} from "../../services/preferences";
import {vacancies} from "../../models/statics";

import "./styles.scss";



const kVacanciesCount: number = 4;


export const HomePage: React.FunctionComponent =
  (): JSX.Element =>
    <React.Fragment>
      <MainLayer
        // companyLogoSrcs = {[
        //   <LogoKaspersky/>,
        //   <Logo1C/>,
        //   <LogoAlpha/>,
        //   <LogoYandex/>,
        //   <LogoMail/>,
        //   <LogoSberbank/>
        // ]}
      />
      <VacanciesLayer
        button = {{
          text: localization.localize("watchAllVacancies"),
          url: "/jobs"
        }}
        vacancies = {vacancies.slice(0, kVacanciesCount)}
      />
      <TelegramLayer link = {preferences.telegramGroup}/>
    </React.Fragment>;
