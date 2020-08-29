import React from "react";
import {localization} from "../../../services/localization";
import {FullVacancy} from "../../../models/vacancy";
import { InlineIcon } from '@iconify/react';
import telegramIcon from '@iconify/icons-mdi/telegram';
import classNames from "classnames";
import {discard} from "../../../utils/Discard";

import "./styles.scss";



const kMaxCompanyWordLength: number = 9;

interface VacancyLayerProps {
  vacancy: FullVacancy;
};

export const VacancyLayer:
React.FunctionComponent<VacancyLayerProps> =
  ({ vacancy }: VacancyLayerProps): JSX.Element =>
    <div className="vacancyLayer">
      <div className="container">
        <div className="fullVacancy row">
          <div className="col s12 l9">
            <div className={classNames(
              "card-panel",
              "vacancy",
              "full"
            )}>
              <header className="row">
                <div className="col s6 jobTitle">
                  <h5>{localization.localize(vacancy.skill as any)}</h5>
                  <p className="secondLine pNoMargin">
                    {localization.localize(vacancy.level)}
                  </p>
                </div>
                <div className="col s6">
                  <div className="col s12 colNoSidePadding companyName">
                    <h5 className={classNames([
                      "right pNoMargin",
                      vacancy.company.name.split(" ").reduce(
                        (accumulator: string, word: string) =>
                          accumulator.length < word.length ?
                            word : accumulator,
                        ""
                      ).length > kMaxCompanyWordLength ?
                        "smaller" : ""
                    ])}>{vacancy.company.name}</h5>
                  </div>
                  <div className="col s12 colNoSidePadding location">
                    <p className="right pNoMargin secondLine">
                      {`${vacancy.location.city}, ${vacancy.location.country}`}
                    </p>
                  </div>
                </div>
              </header>
              <section className="row details">
                <div className="col s6">
                  <div className="stack">
                    <p>{vacancy.stack.join(", ")}</p>
                  </div>
                  <div className="moneySummary">
                    <h6>{vacancy.salary.from} – {vacancy.salary.to} $</h6>
                  </div>
                </div>
                <div className="col s6">{
                  vacancy.remote ?
                    <span className="remote" /* Localize: it throws an exception */>
                      Только удалённо
                    </span>
                  : ""
                }</div>
              </section>
              <section className="description">
                {vacancy.description /* TODO: auto <p> */} 
              </section>
              <a
                className="btn waves-effect"
                onClick={(): void => discard(window.open("#"))} /* TODO: 
                get the tg:// link here */
              >
                Откликнуться в Telegram
                <i className="material-icons left">
                  <InlineIcon icon={telegramIcon} height={23} />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
