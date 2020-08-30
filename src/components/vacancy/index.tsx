import React from "react";
import {Vacancy as VacancyProps} from "../../models/vacancy";
import {Link} from "react-router-dom";
import {localization} from "../../services/localization";
import classNames from "classnames";

import "./styles.scss";



// TODO: sift up this property to a higher level interface? Maybe create config?
const kMaxCompanyWordLength: number = 9;


export const Vacancy: React.FunctionComponent<VacancyProps> =
  (props: VacancyProps): JSX.Element =>
    <Link to = {`vacancies/${props.guid.str}`}>
      <div className={classNames(
        "card-panel",
        "vacancy",
        props.premium ? "premium" : ""
      )}>
        <header className="row">
          <div className="col s6 jobTitle">
            <h5>{localization.localize(props.skill as any)}</h5>
            <p className="secondLine pNoMargin">
              {localization.localize(props.level)}
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
              <p>{props.stack.join(", ")}</p>
            </div>
            <div className="moneySummary">
              <h6>{props.salary.from} – {props.salary.to} $</h6>
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
