import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";

import "./styles.scss";



interface MainLayerProps {
  companyLogoSrcs: string[]
}

export const MainLayer: React.FunctionComponent<MainLayerProps> =
  (props: MainLayerProps): JSX.Element =>
    <div className="row rowNoBottomMargin mainLayer z-depth-1">
      <div className="container">
        <div className="col s12 l5 offset-l2 colNoSidePadding right">
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
            <a className="col btn waves-effect">
              {localization.localize("putVacancy")}
            </a>
            <a className="col btn waves-effect buttonLeft">
              {localization.localize("viewVacancies")}
            </a>
          </div>
        </div>
        <div className="col s12 l5 colNoSidePadding left">
          <h3 className="second mainLayerText center">
            {localization.localize("mainLayerCompaniesTitle")}
          </h3>
          <div className="row flex">{
            props.companyLogoSrcs.map(
              (companyLogoSrc: string, index: number): JSX.Element =>
                <div
                  className="mainLayerCompanyLogo"
                  key={`main-layer-logo-${index}`}
                >
                  <span></span>
                  <img src={companyLogoSrc}/>
                </div>
            )
          }</div>
        </div>
      </div>
    </div>;
