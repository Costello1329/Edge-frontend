import React from "react";
import {Vacancy as VacancyProps} from "../../../models/vacancy";
import {localization} from "../../../services/localization";
import {Link} from "react-router-dom";
import {Vacancy} from "../../vacancy";
import {vacancies} from "../../../models/statics";

import "./styles.scss";



const kVacanciesCount: number = 4;


export const VacanciesLayer: React.FunctionComponent =
  (): JSX.Element =>
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h3 className="col">{localization.localize("vacancies")}</h3>
        </div>
        <div className="vacancies row">{
          vacancies.slice(0, kVacanciesCount).map(
            (vacancy: VacancyProps): JSX.Element =>
              <article className="col s12" key={`vacancy-${vacancy.guid.str}`}>
                <Vacancy {... vacancy}/>
              </article>
          )
        }</div>
        <div className="row rowNoBottomMargin center-align">
          <Link to={"/jobs"}>
            <button className="btn waves-effect">
              <i className="material-icons left">visibility</i>
              {localization.localize("watchAllVacancies")}
            </button>
          </Link>
        </div>
      </div>
    </div>;
