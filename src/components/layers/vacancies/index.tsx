import React from "react";
import {Guid} from "../../../utils/guid";
import {localization} from "../../../services/localization";
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

export interface Vacancy {
  guid: Guid,
  companyName: string,
  jobTitle: string,
  skillLevel: string,
  stack: string,
  moneySummary: string,
  location: string
};

interface VacanciesLayerProps {
  vacancies: Vacancy[],
  button: null | {
    text: string,
    url: string
  }
};

export const VacanciesLayer: React.FunctionComponent<VacanciesLayerProps> =
  (props: VacanciesLayerProps) => 
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h3 className="col">{localization.localize("vacancies")}</h3>
        </div>
        <div className="vacancies row">{
          props.vacancies.map((vacancy: Vacancy): JSX.Element =>
            <article className="col s12">
              <div className="card-panel">
                <header className="row">
                <div className="col s6 jobTitle">
                    <h5>{vacancy.jobTitle}</h5>
                    <p className="secondLine pNoMargin">{vacancy.skillLevel}</p>
                  </div>
                  <div className="col s6">
                    <div className="col s12 colNoSidePadding companyName">
                      <h5 className={classNames([
                        "right pNoMargin",
                        vacancy.companyName.split(" ").reduce(
                          (accumulator: string, word: string) =>
                            accumulator.length < word.length ? word : accumulator,
                          ""
                        ).length > kMaxCompanyWordLength ?
                        "smaller" : ""
                      ])}>{vacancy.companyName}</h5>
                    </div>
                    <div className="col s12 colNoSidePadding location">
                      <p className="right pNoMargin secondLine">
                        {vacancy.location}
                      </p>
                    </div>
                  </div>
                </header>
                <section>
                  <div className="stack">
                    <p>{vacancy.stack}</p>
                  </div>
                  <div className="moneySummary">
                    <h6>{vacancy.moneySummary}</h6>
                  </div>
                </section>
              </div>
            </article>
          )
        }</div>{
          props.button !== null ? 
          <div className="row rowNoBottomMargin center-align">
            <Link to={props.button.url}>
              <a className="btn waves-effect">
                <i className="material-icons left">format_align_justify</i>
                {props.button.text}
              </a>
            </Link>
          </div> : 
          <></>
      }</div>
    </div>;
