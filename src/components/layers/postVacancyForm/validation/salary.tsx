import {ValidationError, Localizer, ValidationRule}
  from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import {localization} from "../../../../services/localization";



export class NotOnlyNumbers extends ValidationError {
  static kGuid: string = "23065c39-5364-4f5d-90e5-2df41a3b91be";
  
  constructor () {
    super(new Guid(NotOnlyNumbers.kGuid));
  }
}

export class TooSmallNumber extends ValidationError {
  static kGuid: string = "24c62805-1bc8-4f67-84ba-06c7d554388b";
  
  constructor () {
    super(new Guid(TooSmallNumber.kGuid));
  }
}

export class TooBigNumber extends ValidationError {
  static kGuid: string = "5c4fb03e-13d1-42f1-9d49-777d6fa2fba5";
  
  constructor () {
    super(new Guid(TooBigNumber.kGuid));
  }
}

export class LessThan extends ValidationError {
  static kGuid: string = "191f68b4-8628-4017-b74c-0b69f5ba5eee";

  constructor (public readonly bound: number) {
    super(new Guid(LessThan.kGuid));
  }
}

const ruleOnlyNumbers: ValidationRule =
  (value: string): ValidationError[] =>
    value.match(/^[0-9]*$/) === null ? [new NotOnlyNumbers()] : [];

export const ruleIsSalary: ValidationRule =
  (value: string): ValidationError[] => {
    const errors: ValidationError[] = ruleOnlyNumbers(value);

    if (value.length < 3)
      errors.push(new TooSmallNumber())

    if (value.length > 5)
      errors.push(new TooBigNumber());

    return [... new Set(errors)];
  };

export const ruleNotLessThan =
  (bound: number): ValidationRule =>
    (value: string): ValidationError[] => {
      const errors: ValidationError[] = ruleOnlyNumbers(value);
      if (errors.length === 0 && parseInt(value) < bound)
        errors.push(new LessThan(bound));
      
      return [... new Set(errors)];
    };


export const salaryLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case NotOnlyNumbers.kGuid:
        return localization.localize("ValidationErrorSalaryNotOnlyNumbers");
      case TooSmallNumber.kGuid:
        return localization.localize("ValidationErrorSalaryTooSmallNumber");
      case TooBigNumber.kGuid:
        return localization.localize("ValidationErrorSalaryTooBigNumber");
      case LessThan.kGuid:
        return localization.localize("ValidationErrorSalaryLessThan")(
          (error as LessThan).bound
        )
    }

    return null;
  };
