import React from "react";
import Materialize from "materialize-css"; 
import {discard} from "../../../utils/Discard";

import "./styles.scss";



interface VacanciesLayerProps {};

interface VacanciesLayerState {};

export class VacanciesLayer
extends React.Component<VacanciesLayerProps, VacanciesLayerState> {
  constructor (props: VacanciesLayerProps) {
    super(props);
    this.state = {};
  }

  public readonly componentDidMount = (): void =>
    discard(setTimeout(
      (): void =>
        discard(Materialize.AutoInit())
    ));

  public readonly render = (): JSX.Element =>
    <div className="vacanciesLayer">
      <div className="container">
        <div className="row rowNoBottomMargin">
          <h4 className="col">Вакансии</h4>
        </div>
        <div className="row rowNoBottomMargin">{
          "123456".split("").map((): JSX.Element =>
            <article className="col s6">
              <div className="card-panel">
                <header className="row">
                  <div className="company col s6 m8">
                    Google
                  </div>
                  <div className="sum col s6 m4">
                    <div className="number">
                      $ 50 000
                    </div>
                    <div className="period">
                      в год
                    </div>
                  </div>
                </header>
                <section className="description">
                  <div className="position">
                    Full-stack Developer
                  </div>
                  <div className="level">
                    Middle
                  </div>
                  <div className="full-text">
                    <p>
                      Товарищи! Реализация намеченных плановых заданий обеспечивает
                      участие в формировании направлений прогрессивного развития.
                    </p>
                  </div>
                </section>
              </div>
            </article>
          )
        }</div>
      </div>
    </div>;
};
