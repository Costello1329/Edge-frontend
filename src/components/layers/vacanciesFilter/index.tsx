import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import {vacancies} from "../../../models/statics"
import {Vacancy, VacancyLevel, VacancySkill} from "../../../models/vacancy";
import {Preloader} from "../../preloader";
import Materialize from "materialize-css";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

interface VacanciesFilterLayerProps {};

interface VacanciesFilterLayerState {
  loading: boolean,
  vacancies: Vacancy[],
  vacanciesFiltered: Vacancy[],
  vacancyLevel: string,
  vacancySkill: string
};

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = {
      vacancies: [],
      vacanciesFiltered: [],
      loading: false,
      vacancyLevel: "0",
      vacancySkill: "0"
    };
  }

  public componentDidMount (): void {
    this.updateDynamicContent();

    /// Put requests to the server here.
    this.setState(
      { loading: true },
      () => setTimeout(
        () => this.setState({
          vacancies,
          vacanciesFiltered: vacancies,
          loading: false
        }), 1000
      )
    );
  }

  public readonly componentDidUpdate =
    (): void => this.updateDynamicContent();

  public updateDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll("select")];

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

  private readonly getFilteredVacancies = (
    levelOption: number,
    skillOption: number
  ): Vacancy[] =>
    this.state.vacancies.filter(
      (vacancy: Vacancy): boolean =>
        (levelOption === 0 ?
          true :
          vacancy.skillLevel === Object.values(VacancyLevel)[levelOption - 1]
        ) && (skillOption === 0 ?
          true :
          vacancy.jobTitle === Object.values(VacancySkill)[skillOption - 1]
        )
    );

  public readonly handleVacancyLevelChange =
    (vacancyLevel: string): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          parseInt(vacancyLevel),
          parseInt(this.state.vacancySkill)
        ), vacancyLevel
      });

  public readonly handleVacancySkillChange =
    (vacancySkill: string): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          parseInt(this.state.vacancyLevel),
          parseInt(vacancySkill)
        ), vacancySkill
      });

  private readonly getLoadedContents = (): JSX.Element => 
    <div className="vacanciesFilterLayer">
      <div className="container">
        <div className="vacancies row">
          <div className="col s12 m3 push-m9">
            <div className="card-panel filter">
              <div className="row">
                <div className="input-field col s12">
                  <h5>{localization.localize("filter")}</h5>
                  <div className = "col s12 noSidePadding">
                    <select
                      value = {this.state.vacancyLevel}
                      onChange = {
                        (event: React.ChangeEvent<HTMLSelectElement>): void =>
                          this.handleVacancyLevelChange(event.target.value)
                      }
                    >
                      <option value="" disabled selected>
                        {localization.localize("level")}
                      </option>
                      {
                        ["all", ... Object.values(VacancyLevel)].map(
                          (value: string, index: number): JSX.Element =>
                            <option value={index}>
                              {localization.localize(value as any)}
                            </option>
                        )
                      }
                    </select>  
                  </div>
                  <div className = "col s12 noSidePadding">
                    <select
                      value = {this.state.vacancySkill}
                      onChange = {
                        (event: React.ChangeEvent<HTMLSelectElement>): void =>
                          this.handleVacancySkillChange(event.target.value)
                      }
                    >
                      <option value="" disabled selected>
                        {localization.localize("stack")}
                      </option>
                      {
                        ["all", ... Object.values(VacancySkill)].map(
                          (value: string, index: number): JSX.Element =>
                            <option value={index}>
                              {localization.localize(value as any)}
                            </option>
                        )
                      }
                    </select>  
                  </div>
                  <div className = "col s12 noSidePadding">
                    <select>
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
          </div>
          <div className="col s12 m9 pull-m3">{
            this.state.vacanciesFiltered.map((vacancy: Vacancy): JSX.Element =>
              <article className="col s12">
                <div className="card-panel">
                  <header className="row">
                    <div className="col s6 jobTitle">
                      <h5>{localization.localize(vacancy.jobTitle as any)}</h5>
                      <p className="secondLine pNoMargin">
                        {localization.localize(vacancy.skillLevel)}
                      </p>
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
