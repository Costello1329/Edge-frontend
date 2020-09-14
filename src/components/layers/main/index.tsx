import React from "react";
import {Link} from "react-router-dom";
import {localization} from "../../../services/localization";

import "./styles.scss";



interface MainLayerProps {
  // companyLogoSrcs: JSX.Element[]
}

export const MainLayer: React.FunctionComponent<MainLayerProps> =
  (props: MainLayerProps): JSX.Element =>
    <div className="row rowNoBottomMargin mainLayer z-depth-1">
      <div className="container">
        {/* <div className="col s12 l5_5 offset-m1 colNoSidePadding right"> */}
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
            <Link to={"/post_vacancy"}>
              <button className="btn waves-effect btnLeft">
                {localization.localize("putVacancy")}
                <i className="material-icons left">add</i>
              </button>
            </Link>
            <Link to={"/vacancies"}>
              <button className="btn waves-effect">
                <i className="material-icons left">visibility</i>
                {localization.localize("viewVacancies")}
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="col s12 l5_5 colNoSidePadding left">
          <h3 className="second mainLayerText center">
            {localization.localize("mainLayerCompaniesTitle")}
          </h3>
          <div className="row flex">{
            props.companyLogoSrcs.map(
              (logo: JSX.Element, index: number): JSX.Element =>
                <div
                  className="mainLayerCompanyLogo"
                  key={`main-layer-logo-${index}`}
                >
                  <span>{logo}</span>
                </div>
            )
          }</div>
        </div> */}
      </div>
    </div>;
