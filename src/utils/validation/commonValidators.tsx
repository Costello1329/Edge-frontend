import {ValidationError} from "./validator";
import {Guid} from "../guid";



/* NOT EMPTY */

export class ValidationErrorEmpty extends ValidationError {
  constructor () {
    super(new Guid("3d112e0b-2070-4f30-b865-3e4d1facec68"));
  }
};

export const ruleNotEmpty = (value: string): ValidationError[] =>
  value === "" ? [new ValidationErrorEmpty()] : [];


/* GUID */
export class ValidationErrorNotGuid extends ValidationError {
  constructor () {
    super(new Guid("70062b0c-996a-48c1-a7f2-b0b4353e6fa0"));
  }
};

export const ruleIsGuid = (value: string): ValidationError[] => {
  const guidMask: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8-b][0-9a-f]{3}-[0-9a-f]{12}$/;

  if (value.match(guidMask) === null)
    return [new ValidationErrorNotGuid()];

  else
    return [];
};
