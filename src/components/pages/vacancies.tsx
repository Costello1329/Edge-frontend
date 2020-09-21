import React from "react";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {VacanciesFilterLayer} from "../layers/vacanciesFilter";
import {localization} from "../../services/localization";
import {Breadcrumb} from "../layers/breadcrumbs";
import {Vacancy} from "../../models/vacancy";
import {Preloader} from "../ui/preloader";
import {vacancies} from "../../models/statics";
import {connection} from "../../services/api/get_jobs";
import {smallJobToVacancy} from "../../models/converters";
import {notifications} from "../../services/notifications";
import {main} from "../../services/api/errors/main";
import {LoadedSmile} from "../ui/loadedSmile";



const breadcrumbs: Breadcrumb[] = [{
  text: localization.localize("home"),
  url: "/"
}, {
  text: localization.localize("vacancies"),
  url: "/jobs"
}];


interface VacanciesPageState {
  loaded: "no" | "success" | "error",
  vacancies: Vacancy[]
}

export class VacanciesPage
extends React.Component<{}, VacanciesPageState> {
  constructor (props: {}) {
    super(props);
    this.state = {
      loaded: "no",
      vacancies: []
    }
  }

  public readonly componentDidMount = () =>
    void(connection.send().then(
      ({ jobs }) => this.setState({
        loaded: "success",
        vacancies: jobs.map(job => smallJobToVacancy(job))
      }),
      () => this.setState({
        loaded: "error"
      }, () => notifications.notify(main))
    ));

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <BreadcrumbsLayer breadcrumbs={breadcrumbs}/>
      {(() => {
        switch(this.state.loaded) {
          case "no":
            return (
              <div className="container preloaderWrapper">
                <Preloader/>
              </div>
            );
          case "success":
            return (
              <VacanciesFilterLayer vacancies={this.state.vacancies}/>
            );
          case "error":
            return (
              <div className="container">
                <LoadedSmile type="error"/>
              </div>
            );
        }
      })()}
    </React.Fragment>;
}
