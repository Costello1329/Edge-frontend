import {ValidationError} from "./validator";
import {Guid} from "../guid";
import { localization } from "../../services/localization";



/* NOT EMPTY */
export class Empty extends ValidationError {
  static kGuid: string = "e0280609-5823-419a-9a50-6438111fe01e";
  
  constructor () {
    super(new Guid(Empty.kGuid));
  }
};

export const ruleNotEmpty = (value: string): ValidationError[] =>
  value === "" ? [new Empty()] : [];


/* GUID */
export class NotGuid extends ValidationError {
  static kGuid: string = "d30f4ed2-722e-4d75-844b-ca1f098bae29";
  
  constructor () {
    super(new Guid(Empty.kGuid));
  }
};

export const ruleIsGuid = (value: string): ValidationError[] => {
  const guidMask: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8-b][0-9a-f]{3}-[0-9a-f]{12}$/;

  if (value.match(guidMask) === null)
    return [new NotGuid()];

  else
    return [];
};


/* LOCALIZER */
export const commonLocalizer = (error: ValidationError): string | null => {
  switch (error.guid.str) {
    case Empty.kGuid:
      return localization.localize("EmptyValidationError");
  }

  return null;
}
