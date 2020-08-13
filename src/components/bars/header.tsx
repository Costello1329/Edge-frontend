import React from "react";
import classNames from "classnames";
import {IconifyIcon, InlineIcon} from "@iconify/react";
import EdgeLogo from "../../../assets/svg/edge-logo.svg";

import "./styles.scss";



interface HeaderIcon {
  data: string | { icon: IconifyIcon, height: number },
  callback: () => void,
  dataTarget: string | undefined,
  class: string | undefined
}

interface HeaderProps {
  icons: HeaderIcon[]
};

export const Header: React.FunctionComponent<HeaderProps> =
  (props: HeaderProps): JSX.Element =>
    <header className="edgeBarHeader">
      <nav>
        <div className="nav-wrapper container">
          <a className="edgeBarText">
            <EdgeLogo/>
          </a>
          <ul id="nav-mobile" className="right">{
            props.icons.map((icon: HeaderIcon, index: number): JSX.Element =>
              <li key = {`header-icon-${index}`}>
                <a
                  className={classNames([
                    index === props.icons.length - 1 ? "last" : "",
                    icon.class !== undefined ? icon.class : ""
                  ])}
                  onClick={(): void => icon.callback()}
                  data-target={icon.dataTarget}
                >
                  <i className="large material-icons">{
                    typeof icon.data === "string" ?
                    icon.data :
                    <InlineIcon icon={icon.data.icon} height={icon.data.height}/>
                  }</i>
                </a>
              </li>
            )
          }</ul>
        </div>
      </nav>
    </header>;
