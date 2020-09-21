import React from "react";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {localization} from "../../services/localization";
import {Breadcrumb} from "../layers/breadcrumbs";
import {FullVacancy} from "../../models/vacancy";
import {Preloader} from "../ui/preloader";
import {FullVacancyLayer} from "../layers/fullVacancy";
import {Job} from "../../models/job";
import {Redirect} from "react-router-dom";
import {Guid} from "../../utils/guid";
import {connection} from "../../services/api/get_job";
import {jobToFullVacancy} from "../../models/converters";
import {notifications} from "../../services/notifications";
import {main} from "../../services/api/errors/main";
import {LoadedSmile} from "../ui/loadedSmile";



const getBreadcrumbs =
(vacancyGuid: string): Breadcrumb[] =>
  [{
    text: localization.localize("home"),
    url: "/"
  }, {
    text: localization.localize("vacancies"),
    url: "/jobs"
  }, {
    text: localization.localize("vacancy"),
    url: `/jobs/${vacancyGuid}`
  }];


interface VacancyPageProps {
  vacancyGuid: Guid
}

interface VacancyPageState {
  loaded: "no" | "success" | "error",
  vacancy: null | FullVacancy
}

export class VacancyPage
extends React.Component<VacancyPageProps, VacancyPageState> {
  constructor (props: VacancyPageProps) {
    super(props);
    this.state = {
      loaded: "no",
      vacancy: null,
    }
  }

  public readonly componentDidMount = () =>
    void(connection.send({ id: this.props.vacancyGuid }).then(
      (job: Job) => this.setState({
        loaded: "success",
        vacancy: jobToFullVacancy(job)
      }),
      () => this.setState({
        loaded: "error"
      }, () => notifications.notify(main))
    ));

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <BreadcrumbsLayer breadcrumbs={getBreadcrumbs(this.props.vacancyGuid.str)}/>
      {(() => {
        switch(this.state.loaded) {
          case "no":
            return (
              <div className="container preloaderWrapper">
                <Preloader/>
              </div>
            );
          case "success":
            return this.state.vacancy === null ?
              <Redirect to="/jobs"/> :
              <FullVacancyLayer vacancy={this.state.vacancy}/>;
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
