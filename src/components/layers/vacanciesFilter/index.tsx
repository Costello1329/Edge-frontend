import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import {vacancies} from "../../../models/statics"
import {Vacancy} from "../../../models/vacancy";
import {Preloader} from "../../preloader";
import Materialize from "materialize-css";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

interface VacanciesFilterLayerProps {};

interface VacanciesFilterLayerState {
  loading: boolean,
  vacancies: Vacancy[]
};

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = { vacancies: [], loading: false };
  }

  public componentDidMount (): void {
    this.updateDynamicContent();

    /// Put requests to the server here.
    this.setState(
      { loading: true },
      () => setTimeout(
        () => this.setState({ vacancies, loading: false }), 1000
      )
    );
  }

  public readonly componentDidUpdate =
    (): void => this.updateDynamicContent();

  public updateDynamicContent (): void {
    const selects: HTMLSelectElement[] = [... document.querySelectorAll('select')];

    selects.map(
      (el: HTMLSelectElement) =>
        Materialize.FormSelect.getInstance(el)
    ).forEach(
      (el: Materialize.FormSelect, index: number): void => {
        if (el === undefined)
          Materialize.FormSelect.init(selects[index]);
      }
    );
  }

  private readonly getLoadedContents = (): JSX.Element => 
    <div className="vacanciesFilterLayer">
      <div className="container">
        <div className="vacancies row">
          <div className="col s12 m3 push-m9">
            <div className="card-panel filter">
              <div className="row">
                <div className="input-field col s12">
                  <h5>{localization.localize("filter")}</h5>
                  <select className="filter">
                    <option value="" disabled selected>
                      {localization.localize("level")}
                    </option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <select className="filter">
                    <option value="" disabled selected>
                      {localization.localize("stack")}
                    </option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <select className="filter">
                    <option value="" disabled selected>
                      {localization.localize("location")}
                    </option>
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
    </div>;

  public readonly render = (): JSX.Element =>
    this.state.loading ?
    <div className = "container preloaderWrapper"><Preloader/></div> :
    this.getLoadedContents();
};
