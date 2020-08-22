import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Materialize from "materialize-css"; 
import telegramIcon from '@iconify/icons-mdi/telegram';
import {discard} from "../../utils/Discard";
import {Header} from "../bars/header";
import {Footer} from "../bars/footer";
import {preferences} from "../../services/preferences";
import {localization} from "../../services/localization";
import {LocaleType} from "../../services/localization/locales";
import {Dropdown} from "../dropdown";
import {HomePage} from "../pages/home";
import {VacanciesPage} from "../pages/vacancies";

import "./styles.scss";



export class App extends React.Component {
  public readonly componentDidMount = (): void =>
    discard(setTimeout((): void => {
      Materialize.AutoInit();
      
      // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    }));

  public readonly render = (): JSX.Element =>
    <Router>
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
      <Header
        homePageUrl="/"
        icons = {[{
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
        }]}
      />
      <main>
        <Route exact path="/">
          <HomePage vacanciesPageUrl="/vacancies"/>
        </Route>
        <Route exact path="/vacancies">
          <VacanciesPage homePageUrl="/"/>
        </Route>
      </main>
      <Footer/>
    </Router>;
};
