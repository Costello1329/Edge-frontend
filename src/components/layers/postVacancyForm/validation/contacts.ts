import {ValidationError, Localizer, ValidationRule}
  from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import {localization} from "../../../../services/localization";



export class NotEmail extends ValidationError {
  static kGuid: string = "036409a0-2f63-46e9-8a58-47a198f13b6e";
  
  constructor () {
    super(new Guid(NotEmail.kGuid));
  }
}

export class NotTelegram extends ValidationError {
  static kGuid: string = "14e6da4b-ec7d-4e22-853b-8a8b13e28cdc";
  
  constructor () {
    super(new Guid(NotTelegram.kGuid));
  }
}

export class NotPhone extends ValidationError {
  static kGuid: string = "3977f476-587a-4b71-b12c-e140e606846e";
  
  constructor () {
    super(new Guid(NotPhone.kGuid));
  }
}

export const ruleIsEmail: ValidationRule =
  (value: string): ValidationError[] =>
    value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) === null ?
    [new NotEmail()] :
    [];

export const ruleIsTelegram: ValidationRule =
  (value: string): ValidationError[] =>
    value.match(/^[A-Za-z0-9_]{5,}$/) === null ?
    [new NotTelegram()] :
    [];

export const ruleIsPhone: ValidationRule =
  (value: string): ValidationError[] =>
    value.match(/^\+[0-9]{1,4}\ [0-9]{1,5}\ ([0-9]+(-| ))*([0-9]+)$/) === null ?
    [new NotPhone()] :
    [];

export const contactsLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case NotEmail.kGuid:
        return localization.localize("ValidationErrorSalaryNotEmail");
      case NotTelegram.kGuid:
        return localization.localize("ValidationErrorSalaryNotTelegram");
      case NotPhone.kGuid:
        return localization.localize("ValidationErrorSalaryNotPhone");
    }

    return null;
  };
