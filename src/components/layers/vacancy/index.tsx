import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import {FullVacancy}
  from "../../../models/vacancy";

import "./styles.scss";



interface VacancyLayerProps {
  vacancy: FullVacancy;
};

export const VacancyLayer:
React.FunctionComponent<VacancyLayerProps> =
  (props: VacancyLayerProps): JSX.Element =>
    <div className="vacancyLayer">
      <div className="container">
        <div className="fullVacancy row">
          <p>мой guid: {props.vacancy.guid.str}</p>
          <p>мой companyName: {props.vacancy.companyName}</p>
          <p>мой jobtitle: {localization.localize(props.vacancy.jobTitle)}</p>
          <p>мой skillLevel: {localization.localize(props.vacancy.skillLevel)}</p>
          <p>мой stack: {props.vacancy.stack}</p>
          <p>мой moneySummary: {props.vacancy.moneySummary}</p>
          <p>мой location: {props.vacancy.location}</p>
          <p>мой description: {props.vacancy.description}</p>
        </div>
      </div>
    </div>;
