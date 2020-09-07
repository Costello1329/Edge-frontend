import React from "react";
import {Link} from "react-router-dom";

import "./styles.scss";



export interface Breadcrumb {
  text: string,
  url: string
}

type BreadcrumbsLayerProps = {
  breadcrumbs: Breadcrumb[]
};

export const BreadcrumbsLayer: React.FunctionComponent<BreadcrumbsLayerProps> =
  (props: BreadcrumbsLayerProps): JSX.Element =>
    <nav>
      <div className="nav-wrapper container">{
        props.breadcrumbs.map(
          (breadcrumb: Breadcrumb, index: number): JSX.Element =>
            <span
              className="breadcrumb clickable"
              key={`breadcrumb-${index.toString()}`} 
            >{
              index === props.breadcrumbs.length - 1 ?
              breadcrumb.text :
              <Link to={breadcrumb.url}>
                {breadcrumb.text}
              </Link>
            }</span>
        )
      }
      </div>
    </nav>;
