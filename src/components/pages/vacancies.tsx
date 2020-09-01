import React from "react";
import {discard} from "../../utils/discard";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {VacanciesFilterLayer} from "../layers/vacanciesFilter";
import {localization} from "../../services/localization";
import {Breadcrumb} from "../layers/breadcrumbs";
import {Vacancy} from "../../models/vacancy";
import {Preloader} from "../ui/preloader";
import {vacancies} from "../../models/statics";



const breadcrumbs: Breadcrumb[] = [{
  text: localization.localize("home"),
  url: "/"
}, {
  text: localization.localize("vacancies"),
  url: "/vacancies"
}];


interface VacanciesPageState {
  loading: boolean,
  vacancies: Vacancy[]
}

export class VacanciesPage
extends React.Component<{}, VacanciesPageState> {
  constructor () {
    super({});
    this.state = {
      loading: false,
      vacancies: []
    }
  }

  public readonly componentDidMount = (): void =>
    this.setState(
      { loading: true }, 
      (): void =>
        discard(setTimeout(
          (): void =>
            this.setState({ loading: false, vacancies }), 
          1000
        ))
    );

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <BreadcrumbsLayer breadcrumbs={breadcrumbs}/>
      {
        this.state.loading ?
        <div className="container preloaderWrapper">
          <Preloader/>
        </div> :
        <VacanciesFilterLayer vacancies={this.state.vacancies}/>
      }
    </React.Fragment>;
};
