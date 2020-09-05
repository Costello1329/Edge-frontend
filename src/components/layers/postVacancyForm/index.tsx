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
import {VacancyLevel, VacancySkill, FullVacancy}
  from "../../../models/vacancy";
import classNames from "classnames";
import {localizer, ruleNotShort} from "./validation";
import {ruleIsLocation} from "./validation/location";
import {ruleIsEmail, ruleIsTelegram, ruleIsPhone, contactsLocalizer}
  from "./validation/contacts";

import "./styles.scss";



type InputValue<T = string> =  { value: T, error: boolean };

type PostVacancyFormLayerState = {
  contact: Record<keyof FullVacancy["contact"], InputValue>,
  location: Record<keyof FullVacancy["location"], InputValue>,
  company: Record<keyof FullVacancy["company"], InputValue>,
  salary: Record<keyof FullVacancy["salary"], InputValue<number>>,
  level: VacancyLevel | null,
  skill: VacancySkill | null,
  description: InputValue,
} & Pick<FullVacancy, "stack" | "remote">;


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
        industry: {
          value: "",
          error: false
        },
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
      stack: [],
      remote: false,
      description: {
        value: "",
        error: false
      }
    };
  }

  private readonly isButtonDisabled =
    (): boolean =>
      this.state.contact.email.error ||
      this.state.contact.phone.error ||
      this.state.contact.telegram.error ||
      this.state.company.name.error ||
      this.state.company.industry.error ||
      this.state.company.website.error ||
      this.state.location.country.error ||
      this.state.description.error

  public readonly render =
    (): JSX.Element =>
      <div className="container postVacancyForm">
        <section className="row company">
          <div className="col s12 l3 header">
            <h4>
              {localization.localize("company")}
            </h4>
          </div>
          <div className="col s12 l9 form">
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
            <div className="col s6 left">
              <Input
                title={localization.localize("companyIndustry")}
                id="post-vacancy-form-company-industry"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty
                  ], [
                    commonLocalizer
                  ])
                }
              />
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
            <h4>
              {localization.localize("location")}
            </h4>
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
            <label htmlFor="remoteCheckbox">
              <input
                type="checkbox"
                id="post-vacancy-form-location-remote"
                checked={undefined}
                onChange={undefined}
              />
              <span>
                {localization.localize("remote")}
              </span>
            </label>
          </div>
        </section>
        <section className="row candidate">
          <div className="col s12 l3 header">
            <h4>
              {localization.localize("candidate")}
            </h4>
          </div>
          <div className="col s12 l9 form">
            <select>
              <option value="" disabled selected>
                {localization.localize("candidateSkill")}
              </option>
              {
                ["all", ...Object.values(VacancySkill)].map(
                  (value: string, index: number): JSX.Element =>
                    <option value={index}>
                      {localization.localize(value as any)}
                    </option>
                )
              }
            </select>
            <div className="col s6 left">
              <select id="post-vacancy-form-candidate-level">
                <option value="" disabled selected>
                  {localization.localize("candidateLevel")}
                </option>
                {
                  ["all", ...Object.values(VacancyLevel)].map(
                    (value: string, index: number): JSX.Element =>
                      <option value={index}>
                        {localization.localize(value as any)}
                      </option>
                  )
                }
              </select>
            </div>
            <div className="col s6 right">
              <select id="post-vacancy-form-candidate-stack" multiple>
                <option value="" disabled selected>
                  {localization.localize("candidateStack")}
                </option>
              </select>
            </div>
          </div>
        </section>
        <section className="row salary">
          <div className="col s12 l3 header">
            <h4>
              {localization.localize("salary")}
            </h4>
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
            <h4>
              {localization.localize("description")}
            </h4>
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
            <h4>
              {localization.localize("contacts")}
            </h4>
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
                "btn",
                "waves-effect",
                this.isButtonDisabled() ? "disabled" : ""
              ])}
              onClick={(): void => alert(JSON.stringify(this.state))}
            >{localization.localize("postVacancy")}</a>
          </div>
        </section>
      </div>;
};
