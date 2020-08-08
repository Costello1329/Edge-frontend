import React from "react";
import Materialize from "materialize-css"; 
import {discard} from "../../utils/Discard";
import {Header} from "../bars/header";
import {Footer} from "../bars/footer";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";
import {getRandomGuid} from "../../utils/guid";

import "./styles.scss";



export class App
extends React.Component {
  constructor () {
    super({});
  }

  public readonly componentDidMount = (): void =>
    discard(setTimeout(
      (): void =>
        discard(Materialize.AutoInit())
    ));

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <Header icons = {[{
        icon: "info_outline",
        callback: (): void => {}
      }, {
        icon: "language",
        callback: (): void => {}
      }]}/>
      <main>
        <MainLayer companyLogoSrcs = {[
          "https://profunctor.io/static/media/l_bolt.fe2a1774.svg",
          "https://profunctor.io/static/media/l_snap.b4d04892.svg",
          "https://profunctor.io/static/media/l_fb.d0f54c89.svg",
          "https://profunctor.io/static/media/l_rev.507a7e70.svg",
          "https://profunctor.io/static/media/l_n26.a986064e.svg",
          "https://profunctor.io/static/media/l_ya.e6cde41a.svg",
          "https://profunctor.io/static/media/l_snap.b4d04892.svg",
          "https://profunctor.io/static/media/l_rev.507a7e70.svg"
        ]}/>
        <VacanciesLayer vacancies = {[{
          guid: getRandomGuid(),
          companyName: "Google",
          jobTitle: "Fullstack engineer",
          skillLevel: "Middle",
          moneySummary: "4 000 - 5 000 $",
          location: "Moscow"
        }, {
          guid: getRandomGuid(),
          companyName: "Yandex",
          jobTitle: "Backend engineer",
          skillLevel: "Junior",
          moneySummary: "1 500 - 2 500 $",
          location: "London"
        }, {
          guid: getRandomGuid(),
          companyName: "Сто семнадцать и два",
          jobTitle: "Fullstack engineer",
          skillLevel: "CTO",
          moneySummary: "40 000 - 50 000 $",
          location: "Prague"
        }, {
          guid: getRandomGuid(),
          companyName: "Google",
          jobTitle: "Fullstack engineer",
          skillLevel: "Middle",
          moneySummary: "4 000 - 5 000 $",
          location: "Greece"
        }, {
          guid: getRandomGuid(),
          companyName: "Google",
          jobTitle: "Fullstack engineer",
          skillLevel: "Middle",
          moneySummary: "4 000 - 5 000 $",
          location: "Georgia"
        }, {
          guid: getRandomGuid(),
          companyName: "Google",
          jobTitle: "Fullstack engineer",
          skillLevel: "Middle",
          moneySummary: "4 000 - 5 000 $",
          location: "Ukraine"
        }]}/>
        <TelegramLayer link = "https://tttttt.me/sns_deanon"/>
      </main>
      <Footer/>
    </React.Fragment>;
};
