import {ValidationError, ValidationRule}
  from "../../../../utils/validation/validator";
import {ruleNotLong, ruleNoDoubledSpaces, ruleNoSideSpaces} from "./index";



export const ruleIsLocation: ValidationRule =
  (value: string): ValidationError[] =>
    [... new Set([
      ... ruleNotLong(value),
      ... ruleNoDoubledSpaces(value),
      ... ruleNoSideSpaces(value)
    ])];
