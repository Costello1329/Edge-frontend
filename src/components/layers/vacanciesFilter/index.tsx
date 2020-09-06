import React from "react";
import {localization} from "../../../services/localization";
import {Vacancy as VacancyProps, VacancyLevel, VacancySkill}
  from "../../../models/vacancy";
import Materialize from "materialize-css";
import {Vacancy} from "../../vacancy";

import "./styles.scss";



interface VacanciesFilterLayerProps {
  vacancies: VacancyProps[];
}

interface VacanciesFilterLayerState {
  vacanciesFiltered: VacancyProps[],
  existingLocations: string[],
  vacancyLevel: null | number,
  vacancySkill: null | number,
  vacancyLocation: null | number,
  vacancyRemoteOnly: boolean
}

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = {
      vacanciesFiltered: [... this.props.vacancies],
      existingLocations: this.getExistingLocations(this.props.vacancies),
      vacancyLevel: null,
      vacancySkill: null,
      vacancyLocation: null,
      vacancyRemoteOnly: false
    };
  }

  public readonly componentDidMount = (): void =>
    this.updateDynamicContent();

  public readonly componentDidUpdate =
    (prevProps: VacanciesFilterLayerProps): void =>
      prevProps !== this.props ?
      this.setState({
        vacanciesFiltered: [... this.props.vacancies],
        existingLocations: this.getExistingLocations(this.props.vacancies),
      }) : void(0);

  private updateDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll<HTMLSelectElement>(
        "select.vacancyFilterSelect"
      )];

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

  private readonly getExistingLocations =
    (vacancies: VacancyProps[]): string[] =>
      [... new Set(vacancies.map(vac => vac.location.city))];

  private readonly getFilteredVacancies = (
    levelOption: number,
    skillOption: number,
    locationOption: number,
    vacancyRemoteOnly: boolean
  ): VacancyProps[] =>
    this.props.vacancies.filter(
      (vacancy: VacancyProps): boolean =>
        (levelOption === 0 ?
          true :
          (vacancy.level === Object.values(VacancyLevel)[levelOption - 1])
        ) && (skillOption === 0 ?
          true :
          (vacancy.skill === Object.values(VacancySkill)[skillOption - 1])
        ) && (locationOption === 0 ?
          true : (
            vacancy.location.city ===
            this.state.existingLocations[locationOption - 1]
          )
        ) && (vacancyRemoteOnly ? vacancy.remote : true)
    );

  private readonly handleVacancyLevelChange =
    (vacancyLevel: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          vacancyLevel,
          this.removeNullOption(this.state.vacancySkill),
          this.removeNullOption(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        ), vacancyLevel
      });

  private readonly handleVacancySkillChange =
    (vacancySkill: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeNullOption(this.state.vacancyLevel),
          vacancySkill,
          this.removeNullOption(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        ), vacancySkill
      });

  private readonly handleVacancyLocationChange =
    (vacancyLocation: number): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeNullOption(this.state.vacancyLevel),
          this.removeNullOption(this.state.vacancySkill),
          vacancyLocation,
          this.state.vacancyRemoteOnly
        ), vacancyLocation
      });

  private readonly handleRemoteOnlyChange =
    (vacancyRemoteOnly: boolean): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeNullOption(this.state.vacancyLevel),
          this.removeNullOption(this.state.vacancySkill),
          this.removeNullOption(this.state.vacancyLocation),
          vacancyRemoteOnly
        ), vacancyRemoteOnly
      });
  
  private readonly removeNullOption =
    (option: number | null): number =>
      option === null ? 0 : option

  public readonly render = (): JSX.Element => 
    <div className="vacanciesFilterLayer">
      <div className="container">
        <div className="vacancies row">
          <div className="col s12 l3 push-l9">
            <div className="card-panel filter">
              <div className="row">
                <div className="input-field col s12">
                  <h5>{localization.localize("filter")}</h5>
                  <div className="row">
                    <div className = "col s12 m6 l12 noSidePadding">
                      <select
                        {
                          ... this.state.vacancyLevel === null ?
                          {} : {value: this.state.vacancyLevel}
                        }
                        className="vacancyFilterSelect"
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
                    <div className="col s12 m6 l12 noSidePadding">
                      <select
                        {
                          ... this.state.vacancySkill === null ?
                          {} : {value: this.state.vacancySkill}
                        }
                        className="vacancyFilterSelect"
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
                  </div>
                  <div className="row">
                    <div className="col s12 m6 l12 noSidePadding">
                      <select
                        {
                          ... this.state.vacancyLocation === null ?
                          {} : {value: this.state.vacancyLocation}
                        }
                        className="vacancyFilterSelect"
                        onChange = {
                          (event: React.ChangeEvent<HTMLSelectElement>): void =>
                            this.handleVacancyLocationChange(
                              parseInt(event.target.value))
                        }
                      >
                        <option value="" disabled selected>
                          {localization.localize("city")}
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
                    <div className="col s12 m6 l12 oSidePadding remoteOnly">
                      <label htmlFor="remoteOnlyCheckbox">
                        <input
                          type="checkbox"
                          id="remoteOnlyCheckbox"
                          checked={this.state.vacancyRemoteOnly}
                          onChange={
                            (event: React.ChangeEvent<HTMLInputElement>): void =>
                              this.handleRemoteOnlyChange(event.target.checked)
                          }
                        />
                        <span>{localization.localize("remoteOnly")}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 l8_5 pull-l3">{
            this.state.vacanciesFiltered.sort(
              (first: VacancyProps, second: VacancyProps): number => {
                if (
                  (first.premium && second.premium) ||
                  (!first.premium && !second.premium)
                )
                  return 0;

                else if (first.premium)
                  return -1;

                else
                  return 1;
              }
            ).map(
              (vacancy: VacancyProps): JSX.Element =>
                <article className="col s12">
                  <Vacancy {... vacancy}/>
                </article>
            )
          }</div>
        </div>
      </div>
    </div>;
}
