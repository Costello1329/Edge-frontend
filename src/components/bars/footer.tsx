import React from "react";
import {localization} from "../../services/localization";
import EdgeLogo from "../../assets/svg/edge-logo.svg";

import "./styles.scss";



export const Footer: React.FunctionComponent =
  (): JSX.Element =>
    <footer className="page-footer edgeBarFooter">
      <div className="footer-copyright container">
        <div className="col s6 edgeBarFooterParagraphs">
          <p className="edgeBarText">
            {localization.localize("copyrightText")}
          </p>
          <p className="edgeBarText">
            {localization.localize("allRightsReserved")}
          </p>
        </div>
        <div className="col s6">
          <div className="right edgeBarText">
            <EdgeLogo/>
          </div>
        </div>
      </div>
    </footer>;
