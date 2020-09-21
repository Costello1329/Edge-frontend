import React from "react";
import {MainLayer} from "../layers/main";
import {TelegramLayer} from "../layers/telegram";
import {VacanciesLayer} from "../layers/vacancies";
import {Vacancy} from "../../models/vacancy";
import {connection} from "../../services/api/get_jobs";
import {smallJobToVacancy} from "../../models/converters";
import {notifications} from "../../services/notifications";
import {main} from "../../services/api/errors/main";
import {LoadedSmile} from "../ui/loadedSmile";
import {Preloader} from "../ui/preloader";

import "./styles.scss";



const kVacanciesCount: number = 4;


interface HomePageState {
  loaded: "no" | "success" | "error",
  vacancies: Vacancy[]
}

export class HomePage extends React.Component<{}, HomePageState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      loaded: "no",
      vacancies: []
    }
  }

  public readonly componentDidMount =
    (): void =>
      void(connection.send({ count: kVacanciesCount }).then(
        ({ jobs }) => this.setState({
          loaded: "success",
          vacancies: jobs.map(job => smallJobToVacancy(job))
        }),
        () => this.setState({
          loaded: "error"
        }, () => notifications.notify(main))
      ));


  public readonly render =
    (): JSX.Element => {
      switch(this.state.loaded) {
        case "no":
          return (
            <div className="container preloaderWrapper">
              <Preloader/>
            </div>
          );
        case "success":
          return (
            <React.Fragment>
              <MainLayer/>
              <VacanciesLayer vacancies = {this.state.vacancies}/>
              <TelegramLayer/>
            </React.Fragment>
          );
        case "error":
          return (
            <div className="container">
              <LoadedSmile type="error"/>
            </div>
          );
      }
    };
}
