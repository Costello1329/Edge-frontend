import {ValidationError, Localizer} from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import { localization } from "../../../../services/localization";



export class NotOnlyNumbers extends ValidationError {
  static kGuid: string = "23065c39-5364-4f5d-90e5-2df41a3b91be";
  
  constructor () {
    super(new Guid(NotOnlyNumbers.kGuid));
  }
}

export class TooBigNumber extends ValidationError {
  static kGuid: string = "5c4fb03e-13d1-42f1-9d49-777d6fa2fba5";
  
  constructor () {
    super(new Guid(TooBigNumber.kGuid));
  }
}

export const ruleIsSalary = (value: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (value.match(/^[0-9]*$/) === null)
    errors.push(new NotOnlyNumbers());

  if (value.length > 5)
    errors.push(new TooBigNumber());

  return errors;
}


export const salaryLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case NotOnlyNumbers.kGuid:
        return localization.localize("ValidationErrorSalaryNotOnlyNumbers");
      case TooBigNumber.kGuid:
        return localization.localize("ValidationErrorSalaryTooBigNumber");
    }

    return null;
  };
