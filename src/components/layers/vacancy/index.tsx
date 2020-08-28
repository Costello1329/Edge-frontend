import React from "react";
import {localization} from "../../../services/localization";
import {FullVacancy} from "../../../models/vacancy";

import "./styles.scss";



interface VacancyLayerProps {
  vacancy: FullVacancy;
};

export const VacancyLayer:
React.FunctionComponent<VacancyLayerProps> =
  ({ vacancy }: VacancyLayerProps): JSX.Element =>
    <div className="vacancyLayer">
      <div className="container">
        <div className="fullVacancy row">
          <p>мой guid: {vacancy.guid.str}</p>
          <p>мой companyName: {vacancy.company.name}</p>
          <p>мой jobtitle: {localization.localize(vacancy.level)}</p>
          <p>мой skillLevel: {localization.localize(vacancy.skill)}</p>
          <p>мой stack: {vacancy.stack.join(", ")}</p>
          <p>мой moneySummary: {vacancy.sallary.from} - {vacancy.sallary.to}</p>
          <p>мой location: {vacancy.location.city}, {vacancy.location.country}</p>
          <p>мой description: {vacancy.description}</p>
        </div>
      </div>
    </div>;
