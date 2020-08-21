import React from "react";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";
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

type HeaderProps = {
  icons: HeaderIcon[],
  homePageUrl: string,
} & RouteComponentProps;

const InnerHeader: React.FunctionComponent<HeaderProps> =
  (props: HeaderProps): JSX.Element =>
    <header className="edgeBarHeader">
      <nav>
        <div className="nav-wrapper container">
          {
            props.location.pathname === "/" ?
            <a className="edgeBarText"><EdgeLogo/></a> :
            <Link to={props.homePageUrl}>
              <a className="edgeBarText"><EdgeLogo/></a>
            </Link>
          }
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


export const Header = withRouter(HeaderInner);
