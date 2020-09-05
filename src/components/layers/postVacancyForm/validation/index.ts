import {ValidationRule, ValidationError, Localizer}
from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import {localization} from "../../../../services/localization";



export class TooShort extends ValidationError {
  static kGuid: string = "de13ab80-9fdf-4c6b-98e2-366a46ecb594";
  
  constructor () {
    super(new Guid(TooShort.kGuid));
  }
}

export class TooLong extends ValidationError {
  static kGuid: string = "78baaaf7-aabc-4723-9eb8-60d53ec340c9";
  
  constructor () {
    super(new Guid(TooLong.kGuid));
  }
}

export class SideSpaces extends ValidationError {
  static kGuid: string = "a2e4598a-ea9b-4223-8d53-32adac4a3faf";

  constructor () {
    super(new Guid(SideSpaces.kGuid));
  }
}

export class DoubledSpaces extends ValidationError {
  static kGuid: string = "151f20aa-a08a-43f4-9672-32e31e06b505";

  constructor () {
    super(new Guid(DoubledSpaces.kGuid));
  }
}

export const ruleNotShort: ValidationRule =
  (value: string): ValidationError[] =>
    value.length < 5 ? [new TooShort()] : [];

export const ruleNotLong: ValidationRule =
  (value: string): ValidationError[] =>
    value.length > 25 ? [new TooLong()] : [];

export const ruleNoDoubledSpaces: ValidationRule =
  (value: string): ValidationError[] =>
    value.indexOf("  ") !== -1 ? [new DoubledSpaces()] : [];

export const ruleNoSideSpaces: ValidationRule =
  (value: string): ValidationError[] =>
    value.length !== 0 && (value[0] === ' ' || value[value.length - 1] === ' ') ?
    [new SideSpaces()] :
    [];

export const localizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case TooShort.kGuid:
        return localization.localize("ValidationErrorCompanyTooShort");
      case TooLong.kGuid:
        return localization.localize("ValidationErrorCompanyTooLong");
      case SideSpaces.kGuid:
        return localization.localize("ValidationErrorCompanySideSpaces");
      case DoubledSpaces.kGuid:
        return localization.localize("ValidationErrorCompanyDoubledSpaces");
    }

    return null;
  };
