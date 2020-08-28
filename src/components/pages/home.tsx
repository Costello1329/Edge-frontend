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
import { vacancies } from "../../models/statics";



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
        vacancies = {vacancies}
      />
      <TelegramLayer link = {preferences.telegramGroup}/>
    </React.Fragment>;
