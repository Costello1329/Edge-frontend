import React from "react";
import classNames from "classnames";

import "./styles.scss";


interface HeaderIcon {
  icon: string,
  callback: () => void
}

interface HeaderProps {
  icons: HeaderIcon[]
};

export const Header: React.FunctionComponent<HeaderProps> =
  (props: HeaderProps): JSX.Element =>
    <header className="edgeBarHeader">
      <nav>
        <div className="nav-wrapper container">
          <a className="edgeBarText">edge</a>
          <ul id="nav-mobile" className="right">{
            props.icons.map(
              ({ icon, callback }: HeaderIcon, index: number): JSX.Element =>
                <li key = {`header-icon-${index}`}>
                  <a
                    className={classNames(
                      ["edgeBarText"],
                      index === props.icons.length - 1 ?
                      "last" :
                      ""
                    )}
                    onClick={(): void => callback()}
                  >
                    <i className="large material-icons">{icon}</i>
                  </a>
                </li>
            )
          }</ul>
        </div>
      </nav>
    </header>;
