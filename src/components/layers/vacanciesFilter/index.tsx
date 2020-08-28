import React from "react";
import {Link} from "react-router-dom";
import {localization} from "../../../services/localization";
import classNames from "classnames";
import {Vacancy, VacancyLevel, VacancySkill} from "../../../models/vacancy";
import Materialize from "materialize-css";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

interface VacanciesFilterLayerProps {
  vacancies: Vacancy[];
};

interface VacanciesFilterLayerState {
  vacanciesFiltered: Vacancy[],
  existingLocations: string[],
  vacancyLevel: number,
  vacancySkill: number,
  vacancyLocation: number
};

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = {
      vacanciesFiltered: [... this.props.vacancies],
      existingLocations: this.getExistingLocations(this.props.vacancies),
      vacancyLevel: 0,
      vacancySkill: 0,
      vacancyLocation: 0
    };
  }

  private readonly getExistingLocations =
    (vacancies: Vacancy[]): string[] =>
      [... new Set(
        vacancies.map((vacancy => vacancy.location))
      )];

  public readonly componentDidMount = (): void =>
    this.updateDynamicContent();

  public componentDidUpdate (prevProps: VacanciesFilterLayerProps) {
    if (prevProps !== this.props)
      this.setState({
        vacanciesFiltered: [... this.props.vacancies],
        existingLocations: this.getExistingLocations(this.props.vacancies),
      });
  }

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
    skillOption: number,
    locationOption: number
  ): Vacancy[] =>
    this.props.vacancies.filter(
      (vacancy: Vacancy): boolean =>
        (levelOption === 0 ?
          true :
          (vacancy.skillLevel === Object.values(VacancyLevel)[levelOption - 1])
        ) && (skillOption === 0 ?
          true :
          (vacancy.jobTitle === Object.values(VacancySkill)[skillOption - 1])
        ) && (locationOption === 0 ?
          true :
          (vacancy.location === this.state.existingLocations[locationOption - 1])
        )
    );

  public readonly handleVacancyLevelChange =
    (vacancyLevel: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          vacancyLevel,
          this.state.vacancySkill,
          this.state.vacancyLocation
        ), vacancyLevel
      });

  public readonly handleVacancySkillChange =
    (vacancySkill: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.state.vacancyLevel,
          vacancySkill,
          this.state.vacancyLocation
        ), vacancySkill
      });

  public readonly handleVacancyLocationChange =
    (vacancyLocation: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.state.vacancyLevel,
          this.state.vacancySkill,
          vacancyLocation
        ), vacancyLocation
      });

  public readonly render = (): JSX.Element => 
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
                          this.handleVacancyLevelChange(
                            parseInt(event.target.value))
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
                          this.handleVacancySkillChange(
                            parseInt(event.target.value))
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
                    <select
                      value = {this.state.vacancyLocation}
                      onChange = {
                        (event: React.ChangeEvent<HTMLSelectElement>): void =>
                          this.handleVacancyLocationChange(
                            parseInt(event.target.value))
                      }
                    >
                      <option value="" disabled selected>
                        {localization.localize("location")}
                      </option>
                      <option value={0}>{localization.localize("all")}</option>
                      {
                        this.state.existingLocations.map(
                          (value: string, index: number): JSX.Element =>
                            <option value={index + 1}>{value}</option>
                        )
                      }
                    </select>  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m9 pull-m3">{
            this.state.vacanciesFiltered.map((vacancy: Vacancy): JSX.Element =>
              <article className="col s12">
                <Link to = {`${document.location.pathname}/${vacancy.guid.str}`}>
                  <div className="card-panel vacancy">
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
                                accumulator.length < word.length ?
                                  word : accumulator,
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
                </Link>
              </article>
            )
          }</div>
        </div>
      </div>
    </div>;
};
