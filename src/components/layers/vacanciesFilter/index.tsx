import React from "react";
import ReactDOM from "react-dom";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import { Dropdown } from "../../dropdown";
import {Vacancy} from "../../../models/vacancy";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

interface VacanciesFilterLayerProps {};

interface VacanciesFilterLayerState {
  vacancies: Vacancy[]
};

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = { vacancies: [] };
  }

  public componentDidMount (): void {
    // Initializing <select>s:
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects, {});

    /// Put requests to the server here.
  }

  public readonly render = (): JSX.Element => 
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h3 className="col">{localization.localize("vacancies")}</h3>
        </div>
        <div className="vacancies row">
          <div className="col s12 m3 push-m9">
            <div className="card-panel filter">
              <div className="row">
                <div className="input-field col s12">
                  <h5>{localization.localize("filter")}</h5>
                  <select className="filter">
                    <option value="" disabled selected>{localization.localize("level")}</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <select className="filter">
                    <option value="" disabled selected>{localization.localize("stack")}</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <select className="filter">
                    <option value="" disabled selected>{localization.localize("location")}</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m9 pull-m3">{
            this.state.vacancies.map((vacancy: Vacancy): JSX.Element =>
              <article className="col s9">
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
          }</div>
        </div>
      </div>
    </div>
};
