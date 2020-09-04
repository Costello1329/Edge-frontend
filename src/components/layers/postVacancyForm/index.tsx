import React from "react";
import {Link} from "react-router-dom";
import {Input} from "../../ui/input";
import {Validator} from "../../../utils/validation/validator";
import {ruleNotEmpty, commonLocalizer}
  from "../../../utils/validation/commonValidators";
import {ruleIsCompany, companyLocalizer} from "./validation/company";
import {localization} from "../../../services/localization";
import {ruleIsSalary, salaryLocalizer} from "./validation/salary";
import { Vacancy as VacancyProps, VacancyLevel, VacancySkill }
  from "../../../models/vacancy";

import "./styles.scss";



interface PostVacancyFormLayerState {

}

export class PostVacancyFormLayer
extends React.Component<{}, PostVacancyFormLayerState> {
  constructor () {
    super({});
    this.state = {};
  }

  public readonly render =
    (): JSX.Element =>
      <div className="container">
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
                  companyLocalizer
                ])
              }
            />
            <div className="col s6 left">
              <Input
                title={localization.localize("companyIndustry")}
                id="post-vacancy-form-company-industry"
                type="text"
                validator={
                  new Validator([
                    ruleNotEmpty,
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
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
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
                  ])
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
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
                  ])
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
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
                  ])
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
                    ruleIsSalary
                  ], [
                    commonLocalizer,
                    salaryLocalizer
                  ])
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
            <textarea id="post-vacancy-form-description" className="materialize-textarea"></textarea>
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
                  ruleIsCompany
                ], [
                  commonLocalizer,
                  companyLocalizer
                ])
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
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
                  ])
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
                    ruleIsCompany
                  ], [
                    commonLocalizer,
                    companyLocalizer
                  ])
                }
              />
            </div>
          </div>
        </section>
        <section className="row post">
          <div className="col s12 l3 header">
          </div>
          <div className="col s12 l9 form">
            <Link to={"/"}>
              <a className="btn waves-effect">
                {localization.localize("postVacancy")}
              </a>
            </Link>
          </div>
        </section>
      </div>;
};
