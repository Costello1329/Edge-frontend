import React from "react";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";

import "./styles.scss";



export const HomePage: React.FunctionComponent =
  (): JSX.Element =>
    <React.Fragment>
      <MainLayer/>
      <VacanciesLayer/>
      <TelegramLayer/>
    </React.Fragment>;
