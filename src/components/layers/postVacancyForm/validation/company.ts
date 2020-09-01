import {ValidationError, Localizer} from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import { localization } from "../../../../services/localization";



export class ProhibitedSymbols extends ValidationError {
  static kGuid: string = "41922c62-7991-4468-8140-2f919daad0fb";
  
  constructor () {
    super(new Guid(ProhibitedSymbols.kGuid));
  }
};

export class TooLong extends ValidationError {
  static kGuid: string = "78baaaf7-aabc-4723-9eb8-60d53ec340c9";
  
  constructor () {
    super(new Guid(TooLong.kGuid));
  }
};

export class SideSpaces extends ValidationError {
  static kGuid: string = "a2e4598a-ea9b-4223-8d53-32adac4a3faf";

  constructor () {
    super(new Guid(SideSpaces.kGuid));
  }
};

export class DoubledSpaces extends ValidationError {
  static kGuid: string = "151f20aa-a08a-43f4-9672-32e31e06b505";

  constructor () {
    super(new Guid(DoubledSpaces.kGuid));
  }
};

export const ruleIsCompany = (value: string): ValidationError[] => {
  const allowedSymbolsMask: RegExp = /^[\x20-\x7e]*$/;

  let validationErrors: ValidationError[] = [];

  if (value.match(allowedSymbolsMask) === null)
    validationErrors.push(new ProhibitedSymbols());

  if (value.length > 25)
    validationErrors.push(new TooLong());

  if (value.indexOf("  ") !== -1)
    validationErrors.push(new DoubledSpaces());

  if (value.length !== 0 && (value[0] === ' ' || value[value.length - 1] === ' '))
    validationErrors.push(new SideSpaces());

    return validationErrors;
};


export const companyLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case ProhibitedSymbols.kGuid:
        return localization.localize("ValidationErrorCompanyProhibitedSymbols");
      case TooLong.kGuid:
        return localization.localize("ValidationErrorCompanyTooLong");
      case SideSpaces.kGuid:
        return localization.localize("ValidationErrorCompanySideSpaces");
      case DoubledSpaces.kGuid:
        return localization.localize("ValidationErrorCompanyDoubledSpaces");
    }

    return null;
  };
