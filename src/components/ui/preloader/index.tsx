import React from "react";

import "./styles.scss";



export const Preloader: React.FunctionComponent =
  (): JSX.Element =>
    <div id = "mainPreloader">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>;
