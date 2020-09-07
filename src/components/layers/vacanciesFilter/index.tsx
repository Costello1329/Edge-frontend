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
  vacancyLevel: null | "all" | keyof typeof VacancyLevel,
  vacancySkill: null | "all" | keyof typeof VacancySkill,
  vacancyLocation: null | "all" | string,
  vacancyRemoteOnly: boolean
}

export class VacanciesFilterLayer
extends React.Component<VacanciesFilterLayerProps, VacanciesFilterLayerState> {
  constructor (props: VacanciesFilterLayerProps) {
    super(props);
    this.state = {
      vacanciesFiltered: [... this.props.vacancies],
      vacancyLevel: null,
      vacancySkill: null,
      vacancyLocation: null,
      vacancyRemoteOnly: false
    };
  }

  public readonly componentDidMount = (): void =>
    this.initializeDynamicContent();

  private initializeDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll<HTMLSelectElement>(
        "select.vacancyFilterSelect"
      )];

    selects.map(
      (el: HTMLSelectElement) =>
        Materialize.FormSelect.getInstance(el)
    ).forEach(
      (el: Materialize.FormSelect, index: number): void =>
        el === undefined ?
        void(Materialize.FormSelect.init(selects[index])) :
        void(0)
    );
  }

  public readonly componentDidUpdate =
    (prevProps: VacanciesFilterLayerProps): void => {
      this.updateDynamicContent();

      if (prevProps !== this.props)
        this.setState({
          vacanciesFiltered: [... this.props.vacancies]
        });
    };

  private updateDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll<HTMLSelectElement>(
        "select.vacancyFilterSelect"
      )];

    selects.map(
      (el: HTMLSelectElement) =>
        Materialize.FormSelect.getInstance(el)
    ).forEach(
      (el: Materialize.FormSelect): void =>
        el.destroy()
    );

    this.initializeDynamicContent();
  }

  private readonly getFilteredVacancies = (
    levelOption: keyof typeof VacancyLevel | null,
    skillOption: keyof typeof VacancySkill | null,
    locationOption: string | null,
    vacancyRemoteOnly: boolean
  ): VacancyProps[] =>
    this.props.vacancies.filter(
      (vacancy: VacancyProps): boolean =>
        (levelOption === null || vacancy.level === levelOption) && 
        (skillOption === null || vacancy.skill === skillOption) &&
        (locationOption === null || vacancy.location.city === locationOption) &&
        (!vacancyRemoteOnly || vacancy.remote)
    );
  
    private readonly removeAll =
      <T extends any>(value: T | "all"): T | null =>
        value === "all" ? null : value;

  private readonly handleVacancyLevelChange =
    (vacancyLevel: keyof typeof VacancyLevel | null | "all"): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(vacancyLevel),
          this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
          this.removeAll<string | null>(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        ), vacancyLevel
      });

  private readonly handleVacancySkillChange =
    (vacancySkill: keyof typeof VacancySkill | null | "all"): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
          this.removeAll<keyof typeof VacancySkill | null>(vacancySkill),
          this.removeAll<string | null>(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        ), vacancySkill
      });

  private readonly handleVacancyLocationChange =
    (vacancyLocation: string | null | "all"): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
          this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
          this.removeAll<string | null>(vacancyLocation),
          this.state.vacancyRemoteOnly
        ), vacancyLocation
      });

  private readonly handleRemoteOnlyChange =
    (vacancyRemoteOnly: boolean): void =>
      this.setState({
        vacanciesFiltered: this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
          this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
          this.removeAll<string | null>(this.state.vacancyLocation),
          vacancyRemoteOnly
        ), vacancyRemoteOnly
      });

  private readonly getLevelOptions =
    (): (keyof typeof VacancyLevel)[] => {
      const filtered: VacancyProps[] =
        this.getFilteredVacancies(
          null,
          this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
          this.removeAll<string | null>(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        );

      return (
        [... Object.keys(VacancyLevel)] as
        (keyof typeof VacancyLevel)[]
      ).filter(
        (key: keyof typeof VacancyLevel): boolean =>
          filtered.find(
            (vacancy: VacancyProps): boolean =>
              vacancy.level === key
          ) !== undefined
      );
    };

  private readonly getSkillOptions =
    (): (keyof typeof VacancySkill)[] => {
      const filtered: VacancyProps[] =
        this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
          null,
          this.removeAll<string | null>(this.state.vacancyLocation),
          this.state.vacancyRemoteOnly
        );

      return (
        [... Object.keys(VacancySkill)] as
        (keyof typeof VacancySkill)[]
      ).filter(
        (key: keyof typeof VacancySkill): boolean =>
          filtered.find(
            (vacancy: VacancyProps): boolean =>
              vacancy.skill === key
          ) !== undefined
      );
    };

  private readonly getLocationOptions =
    (): string[] => {
      const filtered: VacancyProps[] =
        this.getFilteredVacancies(
          this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
          this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
          null,
          this.state.vacancyRemoteOnly
        );

      return [... new Set(this.props.vacancies.map(
        (vacancy: VacancyProps): string =>
          vacancy.location.city
      ))].filter(
        (location: string): boolean =>
          filtered.find(
            (vacancy: VacancyProps): boolean =>
              vacancy.location.city === location
          ) !== undefined
      );
    };

  private readonly canShowRemoteOnlyChecbox =
    (): boolean =>
      this.getFilteredVacancies(
        this.removeAll<keyof typeof VacancyLevel | null>(this.state.vacancyLevel),
        this.removeAll<keyof typeof VacancySkill | null>(this.state.vacancySkill),
        this.removeAll<string | null>(this.state.vacancyLocation),
        false
      ).find(
        (vacancy: VacancyProps): boolean =>
          vacancy.remote
      ) !== undefined;

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
                        value={
                          this.state.vacancyLevel !== null ?
                          this.state.vacancyLevel : ""
                        }
                        className="vacancyFilterSelect"
                        onChange = {
                          (event: React.ChangeEvent<HTMLSelectElement>): void =>
                            this.handleVacancyLevelChange(
                              event.target.value !== "" ?
                              event.target.value as
                                (keyof typeof VacancyLevel | "all") :
                              null
                            )
                        }
                      >
                        <option value="" disabled>
                          {localization.localize("level")}
                        </option>
                        <option
                          value={"all"}
                        >{localization.localize("all")}</option>
                        {
                          this.getLevelOptions().map(
                            (key: keyof typeof VacancyLevel): JSX.Element =>
                              <option
                                value={key}
                                key={`vacancy-filter-level-option-${key}`}
                              >{VacancyLevel[key]}</option>
                          )
                        }
                      </select>  
                    </div>
                    <div className="col s12 m6 l12 noSidePadding">
                      <select
                        value={
                          this.state.vacancySkill !== null ?
                          this.state.vacancySkill : ""
                        }
                        className="vacancyFilterSelect"
                        onChange = {
                          (event: React.ChangeEvent<HTMLSelectElement>): void =>
                            this.handleVacancySkillChange(
                              event.target.value !== "" ?
                              event.target.value as
                                (keyof typeof VacancySkill | "all") :
                              null
                            )
                        }
                      >
                        <option value="" disabled>
                          {localization.localize("stack")}
                        </option>
                        <option value={"all"}>
                          {localization.localize("all")}
                        </option>
                        {
                          this.getSkillOptions().map(
                            (key: keyof typeof VacancySkill): JSX.Element =>
                              <option
                                value={key}
                                key={`vacancy-filter-skill-option-${key}`}
                              >{VacancySkill[key]}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 m6 l12 noSidePadding">
                      <select
                        value={
                          this.state.vacancyLocation !== null ?
                          this.state.vacancyLocation : ""
                        }
                        className="vacancyFilterSelect"
                        onChange = {
                          (event: React.ChangeEvent<HTMLSelectElement>): void =>
                            this.handleVacancyLocationChange(
                              event.target.value !== "" ?
                              event.target.value as (string | "all") :
                              null
                            )
                        }
                      >
                        <option value="" disabled>
                          {localization.localize("city")}
                        </option>
                        <option value={"all"}>
                          {localization.localize("all")}
                        </option>
                        {
                          this.getLocationOptions().map(
                            (key: string): JSX.Element =>
                              <option
                                value={key}
                                key={`vacancy-filter-location-option-${key}`}
                              >{key}</option>
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
                          disabled={!this.canShowRemoteOnlyChecbox()}
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

                else
                  return first.premium ? -1 : 1;
              }
            ).map(
              (vacancy: VacancyProps): JSX.Element =>
                <article className="col s12" key={`vacancy-${vacancy.guid.str}`}>
                  <Vacancy {... vacancy}/>
                </article>
            )
          }</div>
        </div>
      </div>
    </div>;
}
