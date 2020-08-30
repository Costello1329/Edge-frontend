import React from "react";
import {BreadcrumbsLayer} from "../layers/breadcrumbs";
import {PostVacancyFormLayer} from "../layers/postVacancyForm";
import {localization} from "../../services/localization";
import {Breadcrumb} from "../layers/breadcrumbs";



const breadcrumbs: Breadcrumb[] = [{
  text: localization.localize("home"),
  url: "/"
}, {
  text: localization.localize("postVacancy"),
  url: "/post_vacancy"
}];


export class PostVacancyPage
extends React.Component {
  constructor (props: {}) {
    super(props);
    this.state = {};
  }

  public readonly render = (): JSX.Element =>
    <React.Fragment>
      <BreadcrumbsLayer breadcrumbs={breadcrumbs}/>
      <PostVacancyFormLayer/>
    </React.Fragment>;
};
