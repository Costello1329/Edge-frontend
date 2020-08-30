import React from "react";
import {discard} from "../../utils/discard";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {localization} from "../../services/localization";
import {Breadcrumb} from "../layers/breadcrumbs";
import {FullVacancy} from "../../models/vacancy";
import {Preloader} from "../ui/preloader";
import {FullVacancyLayer} from "../layers/fullVacancy";
import {fullVacancy} from "../../models/statics";
import {Redirect} from "react-router-dom";



const getBreadcrumbs =
(vacancyGuid: string): Breadcrumb[] =>
  [{
    text: localization.localize("home"),
    url: "/"
  }, {
    text: localization.localize("vacancies"),
    url: "/vacancies"
  }, {
    text: localization.localize("vacancy"),
    url: `/vacancies/${vacancyGuid}`
  }];


interface VacancyPageProps {
  vacancyGuid: string
};

interface VacancyPageState {
  loaded: boolean,
  vacancy: null | FullVacancy
}

export class VacancyPage
extends React.Component<VacancyPageProps, VacancyPageState> {
  constructor (props: VacancyPageProps) {
    super(props);
    this.state = {
      loaded: false,
      vacancy: null
    }
  }

  public readonly componentDidMount = (): void =>
    discard(setTimeout(
      (): void => this.setState({
        loaded: true,
        vacancy: fullVacancy
      }),
      1000
    ));

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <BreadcrumbsLayer breadcrumbs={getBreadcrumbs(this.props.vacancyGuid)}/>
      {
        !this.state.loaded ?
        <div className="container preloaderWrapper">
          <Preloader/>
        </div> : (
          this.state.vacancy === null ?
          <Redirect to="/vacancies"/> :
          <FullVacancyLayer vacancy={this.state.vacancy}/>
        )
      }
    </React.Fragment>;
};
