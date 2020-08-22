import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import {Vacancy} from "../../../models/vacancy";



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
    /// Put requests to the server here.
  }

  public readonly render = (): JSX.Element => 
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h3 className="col">{localization.localize("vacancies")}</h3>
        </div>
        <div className="vacancies row">{
          this.state.vacancies.map((vacancy: Vacancy): JSX.Element =>
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
        }</div>
      </div>
    </div>
};
