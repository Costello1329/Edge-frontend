import {ValidationError, Localizer, ValidationRule}
  from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import {ruleNotLong, ruleNoDoubledSpaces, ruleNoSideSpaces} from "./index";
import {localization} from "../../../../services/localization";



export class ProhibitedSymbols extends ValidationError {
  static kGuid: string = "41922c62-7991-4468-8140-2f919daad0fb";
  
  constructor () {
    super(new Guid(ProhibitedSymbols.kGuid));
  }
}

export const ruleIsCompany: ValidationRule =
  (value: string): ValidationError[] => {
    const allowedSymbolsMask: RegExp = /^[\x20-\x7e]*$/;

    let validationErrors: ValidationError[] = [
      ... ruleNotLong(value),
      ... ruleNoDoubledSpaces(value),
      ... ruleNoSideSpaces(value)
    ];

    if (value.match(allowedSymbolsMask) === null)
      validationErrors.push(new ProhibitedSymbols());

    return [... new Set(validationErrors)];
  };


export const companyLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case ProhibitedSymbols.kGuid:
        return localization.localize("ValidationErrorCompanyProhibitedSymbols");
    }

    return null;
  };
