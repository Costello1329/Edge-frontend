import React from "react";
import Materialize from "materialize-css"; 
import {discard} from "../../../utils/Discard";
import {Guid} from "../../../utils/guid";

import "./styles.scss";
import { localization } from "../../../services/localization";



interface Vacancy {
  guid: Guid
  companyName: string,
  jobTitle: string,
  skillLevel: string,
  moneySummary: string,
  moneyPeriod: string,
  description: string,
};

interface VacanciesLayerProps {
  vacancies: Vacancy[]
};

export const VacanciesLayer: React.FunctionComponent<VacanciesLayerProps> =
  (props: VacanciesLayerProps) => 
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h4 className="col">{localization.localize("vacancies")}</h4>
        </div>
        <div className="row rowNoBottomMargin">{
          props.vacancies.map((vacancy: Vacancy): JSX.Element =>
            <article className="col s6">
              <div className="card-panel">
                <header className="row">
                  <div className="col s6">
                    {vacancy.companyName}
                  </div>
                  <div className="sum col s6">
                    <div className="right">{vacancy.moneySummary}</div>
                    <div className="right">{vacancy.moneyPeriod}</div>
                  </div>
                </header>
                <section className="description">
                  <div>{vacancy.jobTitle}</div>
                  <div>{vacancy.skillLevel}</div>
                  <div><p>{vacancy.description}</p></div>
                </section>
              </div>
            </article>
          )
        }</div>
      </div>
    </div>;
