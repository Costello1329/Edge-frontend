import React from "react";
import {Input} from "../../ui/input";
import {Validator, ValidationError} from "../../../utils/validation/validator";
import {ruleNotEmpty, commonLocalizer}
  from "../../../utils/validation/commonValidators";
import {ruleIsCompany, companyLocalizer} from "./validation/company";
import {ruleIsSite, siteLocalizer} from "./validation/site";
import {localization} from "../../../services/localization";
import {ruleIsSalary, salaryLocalizer, ruleNotLessThan, LessThan}
  from "./validation/salary";
import {VacancyLevel, VacancySkill, FullVacancy, VacancyStack, VacancyIndustry}
  from "../../../models/vacancy";
import classNames from "classnames";
import {localizer, ruleNotShort} from "./validation";
import {ruleIsLocation} from "./validation/location";
import {ruleIsEmail, ruleIsTelegram, ruleIsPhone, contactsLocalizer}
  from "./validation/contacts";
import Materialize from "materialize-css";

import "./styles.scss";



type InputValue<T = string> =  { value: T, error: boolean };

type PostVacancyFormLayerState = {
  contact: Record<keyof FullVacancy["contact"], InputValue>,
  location: Record<keyof FullVacancy["location"], InputValue>,
  company: Record<
    keyof Omit<FullVacancy["company"], "industry">,
    InputValue
  > & { industry: FullVacancy["company"]["industry"] | null },
  salary: Record<keyof FullVacancy["salary"], InputValue<number>>,
  level: FullVacancy["level"] | null,
  skill: FullVacancy["skill"] | null,
  stack: number[]
  description: InputValue,
} & Pick<FullVacancy, "remote">;


export class PostVacancyFormLayer
extends React.Component<{}, PostVacancyFormLayerState> {
  constructor () {
    super({});
    this.state = {
      contact: {
        email: {
          value: "",
          error: false
        },
        phone: {
          value: "",
          error: false
        },
        telegram: {
          value: "",
          error: false
        },
      },
      location: {
        country: {
          value: "",
          error: false
        },
        city: {
          value: "",
          error: false
        },
      },
      company: {
        name: {
          value: "",
          error: false
        },
        industry: null,
        website: {
          value: "",
          error: false
        },
      },
      salary: {
        from: {
          value: 0,
          error: false
        },
        to: {
          value: 0,
          error: false
        }
      },
      level: null,
      skill: null,
      stack: [0],
      remote: false,
      description: {
        value: "",
        error: false
      }
    };
  }

  public readonly componentDidMount = (): void =>
    this.updateDynamicContent();

  private updateDynamicContent (): void {
    const selects: HTMLSelectElement[] =
      [... document.querySelectorAll<HTMLSelectElement>(
        "select.postVacancyFormSelect"
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

  private readonly handleStackChange =
    (str: HTMLCollectionOf<HTMLOptionElement>): void =>
      this.setState({
        stack:
          [... str].map(
            (option: HTMLOptionElement): number =>
              parseInt(option.value)
          )
      });

  private readonly isButtonDisabled =
    (): boolean =>
      this.state.company.name.error ||
      this.state.company.industry === null ||
      this.state.company.website.error ||
      this.state.location.country.error ||
      this.state.location.city.error ||
      this.state.skill === null ||
      this.state.level === null ||
      this.state.stack.length <= 1 ||
      this.state.salary.from.error ||
      this.state.salary.to.error ||
      this.state.contact.email.error ||
      this.state.contact.telegram.error ||
      this.state.contact.phone.error;

  public readonly render =
    (): JSX.Element =>
      <div className="container postVacancyForm">
        <section className="row company">
          <div className="col s12 l3 header">
            <h5>{localization.localize("company")}</h5>
          </div>
          <div className="col s12 l9 form">
            <div className="col s12 left">
              <Input
                title={localization.localize("companyName")}
                id="post-vacancy-form-company-name"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      company: {
                        ... state.company,
                        name: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 left">
              <select
                {
                  ... this.state.company.industry !== null ?
                  {value: this.state.company.industry} :
                  {}
                }
                className="postVacancyFormSelect"
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void => {
                    const industry: VacancyIndustry =
                      Object.values(VacancyIndustry)[parseInt(event.target.value)];

                    this.setState(state => ({
                      company: { ... state.company, industry }
                    }));
                  }
                }
              >
                <option value="" disabled selected>
                  {localization.localize("companyIndustry")}
                </option>
                {
                  [... Object.keys(VacancyIndustry)].map(
                    (key: string, index: number): JSX.Element =>
                      <option value={index.toString()}>{key}</option>
                  )
                }
              </select>
            </div>
            <div className="col s6 right">
              <Input
                title={localization.localize("companyWebsite")}
                id="post-vacancy-form-company-website"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSite
                  ], [
                    commonLocalizer,
                    siteLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      company: {
                        ... state.company,
                        website: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
        <section className="row location">
          <div className="col s12 l3 header">
            <h5>
              {localization.localize("location")}
            </h5>
          </div>
          <div className="col s12 l9 form">
            <div className="col s6 left">
              <Input
                title={localization.localize("locationCountry")}
                id="post-vacancy-form-location-country"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsLocation
                  ], [
                    commonLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      location: {
                        ... state.location,
                        country: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 right">
              <Input
                title={localization.localize("locationCity")}
                id="post-vacancy-form-location-city"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsLocation
                  ], [
                    commonLocalizer,
                    localizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      location: {
                        ... state.location,
                        city: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <label htmlFor="post-vacancy-form-location-remote">
              <input
                type="checkbox"
                id="post-vacancy-form-location-remote"
                checked={this.state.remote}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>): void =>
                    this.setState({
                      remote: event.target.checked
                    })
                }
              />
              <span>{localization.localize("remote")}</span>
            </label>
          </div>
        </section>
        <section className="row candidate">
          <div className="col s12 l3 header">
            <h5>{localization.localize("candidate")}</h5>
          </div>
          <div className="col s12 l9 form">
            <select
              {... this.state.skill === null ? {} : {value: this.state.skill}}
              className="postVacancyFormSelect"
              onChange = {
                (event: React.ChangeEvent<HTMLSelectElement>): void =>
                  this.setState({
                    skill:
                      Object.values(VacancySkill)[parseInt(event.target.value)]
                  })
              }
            >
              <option value="" disabled selected>
                {localization.localize("candidateSkill")}
              </option>
              {
                [...Object.values(VacancySkill)].map(
                  (value: string, index: number): JSX.Element =>
                    <option value={index.toString()}>
                      {localization.localize(value as any)}
                    </option>
                )
              }
            </select>
            <div className="col s6 left">
              <select
                className="postVacancyFormSelect"
                id="post-vacancy-form-candidate-level"
                {... this.state.level === null ? {} : {value: this.state.level}}
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void =>
                    this.setState({
                      level:
                        Object.values(VacancyLevel)[parseInt(event.target.value)]
                    })
                }
              >
                <option value="" disabled selected>
                  {localization.localize("candidateLevel")}
                </option>
                {
                  [...Object.values(VacancyLevel)].map(
                    (value: string, index: number): JSX.Element =>
                      <option value={index.toString()}>
                        {localization.localize(value as any)}
                      </option>
                  )
                }
              </select>
            </div>
            <div className="col s6 right">
              <select
                className="postVacancyFormSelect"
                multiple
                onChange = {
                  (event: React.ChangeEvent<HTMLSelectElement>): void =>
                    this.handleStackChange(event.target.selectedOptions)
                }
              >
                <option
                  value="0"
                  disabled
                  selected={this.state.stack.indexOf(0) !== -1}
                >
                  {localization.localize("candidateStack")}
                </option>
                {
                  Object.keys(VacancyStack).map(
                    (key: string, index: number): JSX.Element =>
                      <option
                        value={(index + 1).toString()}
                        selected={this.state.stack.indexOf(index + 1) !== -1}
                      >{key}</option>
                  )
                }
              </select>
            </div>
          </div>
        </section>
        <section className="row salary">
          <div className="col s12 l3 header">
            <h5>{localization.localize("salary")}</h5>
          </div>
          <div className="col s12 l9 form">
            <div className="col s6 left">
              <Input
                title={localization.localize("salaryFrom")}
                id="post-vacancy-form-salary-from"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSalary
                  ], [
                    commonLocalizer,
                    salaryLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      salary: {
                        ... state.salary,
                        from: { value: parseInt(value, 10), error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 right">
              <Input
                title={localization.localize("salaryTo")}
                id="post-vacancy-form-salary-to"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsSalary,
                    ruleNotLessThan(this.state.salary.from.value)
                  ], [
                    commonLocalizer,
                    salaryLocalizer
                  ], (errors: ValidationError[]): ValidationError => {
                    const found = errors.find(e => e instanceof LessThan);
                    if (found !== undefined)
                      return found;
                    else return errors[0];
                  })
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      salary: {
                        ... state.salary,
                        to: { value: parseInt(value, 10), error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
        <section className="row description">
          <div className="col s12 l3 header">
            <h5>
              {localization.localize("description")}
            </h5>
          </div>
          <div className="col s12 l9 form">
            <textarea
              id="post-vacancy-form-description"
              className="materialize-textarea"
            ></textarea>
          </div>
        </section>
        <section className="row contacts">
          <div className="col s12 l3 header">
            <h5>
              {localization.localize("contacts")}
            </h5>
          </div>
          <div className="col s12 l9 form">
            <Input
              title={localization.localize("contactsEmail")}
              id="post-vacancy-form-contacts-email"
              type="text"
              validator={
                new Validator([
                  ruleNotEmpty,
                  ruleIsEmail
                ], [
                  commonLocalizer,
                  contactsLocalizer
                ])
              }
              changeCallback={
                (value: string, error: ValidationError | null): void =>
                  this.setState((state: PostVacancyFormLayerState) => ({
                    contact: {
                      ... state.contact,
                      email: { value, error: error !== null }
                    }
                  })
                )
              }
            />
            <div className="col s6 left">
              <Input
                title="Telegram"
                id="post-vacancy-form-contacts-telegram"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleNotShort,
                    ruleIsTelegram
                  ], [
                    localizer,
                    commonLocalizer,
                    contactsLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      contact: {
                        ... state.contact,
                        telegram: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
            <div className="col s6 right">
              <Input
                title={localization.localize("contactsPhone")}
                id="post-vacancy-form-contacts-phone"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsPhone
                  ], [
                    commonLocalizer,
                    contactsLocalizer
                  ])
                }
                changeCallback={
                  (value: string, error: ValidationError | null): void =>
                    this.setState((state: PostVacancyFormLayerState) => ({
                      contact: {
                        ... state.contact,
                        phone: { value, error: error !== null }
                      }
                    })
                  )
                }
              />
            </div>
          </div>
        </section>
        <section className="row post">
          <div className="col s12 l3 header">
          </div>
          <div className="col s12 l9 form">
            <a
              className={classNames([
                "btn-large",
                "waves-effect",
                "col s12",
                this.isButtonDisabled() ? "disabled" : ""
              ])}
              onClick={(): void => alert(JSON.stringify(this.state))}
            >{localization.localize("postVacancy")}</a>
          </div>
        </section>
      </div>;
};
