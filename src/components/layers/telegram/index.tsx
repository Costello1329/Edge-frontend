import React from "react";
import {localization} from "../../../services/localization";
import {InlineIcon} from '@iconify/react';
import telegramIcon from '@iconify/icons-mdi/telegram';


import "./styles.scss";



interface TelegramLayerProps {
  link: string
}

export const TelegramLayer: React.FunctionComponent<TelegramLayerProps> =
  (props: TelegramLayerProps): JSX.Element =>
    <div className="row rowNoBottomMargin telegramLayer z-depth-1">
      <div className="container center-align">
        <h5>{localization.localize("joinOurTelegram")}</h5>
        <a
          className="btn waves-effect"
          onClick={(): void => void(window.open(props.link))}
        >
          {localization.localize("telegramGroupName")}
          <i className="material-icons left">
            <InlineIcon icon={telegramIcon} height={23}/>
          </i>
        </a>
      </div>
    </div>;
