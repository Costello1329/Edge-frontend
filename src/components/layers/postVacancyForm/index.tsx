import React from "react";
import {Input} from "../../ui/input";
import {Validator} from "../../../utils/validation/validator";
import {ruleNotEmpty} from "../../../utils/validation/commonValidators";
import {ruleIsCompany} from "./validation/company";
import { localization } from "../../../services/localization";



interface PostVacancyFormLayerState {

};

export class PostVacancyFormLayer
extends React.Component<{}, PostVacancyFormLayerState> {
  constructor (props: {}) {
    super(props);
    this.state = {};
  }

  public readonly render =
    (): JSX.Element =>
      <div className="container">
        <Input
          title = {localization.localize("companyName")}
          id = "post-vacancy-form-company-name"
          type = "text"
          validator = {new Validator([
            ruleNotEmpty,
            ruleIsCompany
          ])}
        />
      </div>;
};
