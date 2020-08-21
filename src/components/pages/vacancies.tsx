import React from "react";
import {discard} from "../../utils/Discard";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {VacanciesLayer} from "../layers/vacancies";
import {localization} from "../../services/localization";
import {getRandomGuid} from "../../utils/guid";
import {Breadcrumb} from "../layers/breadcrumbs";
import {Vacancy} from "../layers/vacancies";



const breadcrumbs: Breadcrumb[] = [{
  text: localization.localize("home"),
  url: "/"
}, {
  text: localization.localize("vacancies"),
  url: "/vacancies"
}]

const vacancies: Vacancy[] = [{
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "JS, TS, React, SCSS, SASS, Rust, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Moscow"
}, {
  guid: getRandomGuid(),
  companyName: "Yandex",
  jobTitle: "Backend engineer",
  skillLevel: "Junior",
  stack: "Blowjob, Anal",
  moneySummary: "1 500 – 2 500 $",
  location: "London"
}, {
  guid: getRandomGuid(),
  companyName: "Сто семнадцать и два",
  jobTitle: "Callback engineer",
  skillLevel: "CTO",
  stack: "Autohotkey",
  moneySummary: "40 000 – 50 000 $",
  location: "Prague"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Greece"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Georgia"
}, {
  guid: getRandomGuid(),
  companyName: "Google",
  jobTitle: "Fullstack engineer",
  skillLevel: "Middle",
  stack: "JS, Python",
  moneySummary: "4 000 – 5 000 $",
  location: "Ukraine"
}];


interface VacanciesPageProps {
  homePageUrl: string
};

interface VacanciesPageState {
  loading: boolean,
  vacancies: Vacancy[]
}

export class VacanciesPage
extends React.Component<VacanciesPageProps, VacanciesPageState> {
  constructor (props: VacanciesPageProps) {
    super(props);
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
      <BreadcrumbsLayer 
        breadcrumbs={breadcrumbs}
      />
      
      {
        this.state.loading ?
        "Ща, падажжи" : 
        <VacanciesLayer
          button={null}
          vacancies={this.state.vacancies}
        />
      }
    </React.Fragment>;
};