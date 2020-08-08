import React from "react";
import Materialize from "materialize-css"; 
import {discard} from "../../../utils/Discard";
import {Guid} from "../../../utils/guid";
import {localization} from "../../../services/localization";

import "./styles.scss";



interface Vacancy {
  guid: Guid,
  companyName: string,
  jobTitle: string,
  skillLevel: string,
  moneySummary: string,
  location: string
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
          ((): Vacancy[][] => {
            let groups: Vacancy[][] = [];

            props.vacancies.forEach(
              (vacancy): void => {
                if (groups.length !== 0 && groups[groups.length - 1].length < 2)
                  groups[groups.length - 1].push(vacancy);

                else 
                  groups.push([vacancy]);
              }
            );

            return groups;
          })().map((group: Vacancy[]): JSX.Element =>
            <div className="row rowNoBottomMargin">{
              group.map((vacancy: Vacancy): JSX.Element =>
                <article className="col s6">
                  <div className="card-panel">
                    <header className="row">
                      <div className="col s6 vacanciesLayerCompanyName">
                        <h5>{vacancy.companyName}</h5>
                      </div>
                      <div className="col s6">
                        <div className="col s12 colNoSidePadding">
                          <p className="right pNoMargin">
                            {vacancy.moneySummary}
                          </p>
                        </div>
                      </div>
                    </header>
                    <section>
                      <div className="vacanciesLayerJobTitle">
                        <h6>{vacancy.jobTitle}</h6>
                      </div>
                      <div>{vacancy.skillLevel}</div>
                      <div><p>{vacancy.location}</p></div>
                    </section>
                  </div>
                </article>
              )
            }</div>
          )
        }</div>
      </div>
    </div>;
