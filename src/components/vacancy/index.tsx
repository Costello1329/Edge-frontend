import React from "react";
import {Vacancy as VacancyProps, VacancySkill, VacancyLevel, VacancyStack}
  from "../../models/vacancy";
import {Link} from "react-router-dom";
import {localization} from "../../services/localization";
import classNames from "classnames";
import {formatSalary} from "../../utils/formatters/salary";

import "./styles.scss";



// TODO: sift up this property to a higher level interface? Maybe create config?
const kMaxCompanyWordLength: number = 9;


export const Vacancy: React.FunctionComponent<VacancyProps> =
  (props: VacancyProps): JSX.Element =>
    <Link to = {`jobs/${props.guid.str}`}>
      <div className={classNames(
        "card-panel",
        "vacancy",
        props.premium ? "premium" : ""
      )}>
        <header className="row">
          <div className="col s6 jobTitle">
            <h5>{VacancySkill[props.skill]}</h5>
            <p className="secondLine pNoMargin">
              {VacancyLevel[props.level]}
            </p>
          </div>
          <div className="col s6">
            <div className="col s12 colNoSidePadding companyName">
              <h5 className={classNames([
                "right pNoMargin",
                props.companyName.split(" ").reduce(
                  (accumulator: string, word: string) =>
                    accumulator.length < word.length ?
                      word : accumulator,
                  ""
                ).length > kMaxCompanyWordLength ?
                "smaller" : ""
              ])}>{props.companyName}</h5>
            </div>
            <div className="col s12 colNoSidePadding location">
              <p className="right pNoMargin secondLine">
                {`${props.location.city}, ${props.location.country}`}
              </p>
            </div>
          </div>
        </header>
        <section className="row details">
          <div className="col s6">
            <div className="stack">
              <p>{props.stack.map(key => VacancyStack[key]).join(", ")}</p>
            </div>
            <div className="moneySummary">
              <h6>{`${
                  formatSalary(props.salary.from)
                } – ${
                  formatSalary(props.salary.to)
                }\u202f$`
              }</h6>
            </div>
          </div>
          <div className="col s6 stickToBottom">{
            props.remote ?
            <span className="remote">
              {localization.localize("remote")}
            </span> : ""
          }</div>
        </section>
      </div>
    </Link>;
