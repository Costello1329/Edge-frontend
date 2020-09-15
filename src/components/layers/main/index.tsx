import React from "react";
import {Link} from "react-router-dom";
import {localization} from "../../../services/localization";

import "./styles.scss";



export const MainLayer: React.FunctionComponent =
  (): JSX.Element =>
    <div className="row rowNoBottomMargin mainLayer z-depth-1">
      <div className="container">
        <div className="col s12 l8 colNoSidePadding">
          <h3 className="first mainLayerText">
            {localization.localize("mainLayerTitle")}
          </h3>
          {
            localization.localize("mainLayerParagraphs").map(
              (parapgraph: string, index: number): JSX.Element =>
                <p
                  key = {`main-layer-paragraph-${index}`}
                  className="mainLayerTextDarken"
                >{parapgraph}</p>
            )
          }
          <div className="mainLayerButtons">
            <Link to={"/post_job"}>
              <button className="btn waves-effect btnLeft">
                {localization.localize("putVacancy")}
                <i className="material-icons left">add</i>
              </button>
            </Link>
            <Link to={"/jobs"}>
              <button className="btn waves-effect">
                <i className="material-icons left">visibility</i>
                {localization.localize("viewVacancies")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
