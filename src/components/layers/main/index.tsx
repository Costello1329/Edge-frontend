import React from "react";
import {localization} from "../../../services/localization";
import classNames from "classnames";

import "./styles.scss";



interface MainLayerProps {
  companyLogoSrcs: string[]
}

export const MainLayer: React.FunctionComponent<MainLayerProps> =
  (props: MainLayerProps): JSX.Element =>
    <div className="row rowNoBottomMargin mainLayer">
      <div className="container">
        <div className="col s12 l5 colNoSidePadding">
          <h3 className="mainLayerText center">
            {localization.localize("mainLayerCompaniesTitle")}
          </h3>
          <div className="row">{
            props.companyLogoSrcs.map(
              (companyLogoSrc: string, index: number): JSX.Element =>
                <div
                  className={classNames([
                    "col s4 mainLayerCompanyLogo",
                    "mainLayerCompanyLogo",
                    index === (
                      props.companyLogoSrcs.length -
                      props.companyLogoSrcs.length % 3
                    ) ? `offset-s${6 - 2 * (props.companyLogoSrcs.length % 3)}` : ""
                  ])}
                  key={`main-layer-logo-${index}`}
                >
                  <span></span>
                  <img src={companyLogoSrc}/>
                </div>
            )
          }</div>
        </div>
        <div className="col s12 l5 offset-l2 colNoSidePadding">
          <h3 className="mainLayerText">
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
            <a className="col s5 m4 l5 offset-m1 btn waves-effect">
              {localization.localize("putVacancy")}
            </a>
            <a className="col s5 m4 l5 offset-s2 offset-m2 offset-l2 btn waves-effect">
              {localization.localize("viewVacancies")}
            </a>
          </div>
        </div>
      </div>
    </div>;
