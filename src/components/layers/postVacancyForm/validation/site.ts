import {ValidationError, Localizer, ValidationRule}
  from "../../../../utils/validation/validator";
import {Guid} from "../../../../utils/guid";
import { localization } from "../../../../services/localization";



export class StartsNotWithSchema extends ValidationError {
  static kGuid: string = "0eeef594-e1dc-4423-b377-97401337b238";
  
  constructor () {
    super(new Guid(StartsNotWithSchema.kGuid));
  }
}

export class Spaces extends ValidationError {
  static kGuid: string = "036340ce-2272-44ba-ba67-aedb813d0968";
  
  constructor () {
    super(new Guid(Spaces.kGuid));
  }
}

export const ruleIsSite: ValidationRule =
  (value: string): ValidationError[] => {
    let validationErrors: ValidationError[] = [];

    const allowedSchemas: string[] = ["http", "https"];
    let foundMatch: boolean = false;

    for (const schema of allowedSchemas) {
      const fullSchema: string = schema + "://"
      if ((
        (value.length >= fullSchema.length) &&
        (value.substr(0, fullSchema.length) === fullSchema)
      ) || (
        (value.length < fullSchema.length) &&
        (value.substr(0, value.length) === fullSchema.substr(0, value.length))
      )) {
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch)
      validationErrors.push(new StartsNotWithSchema());

    if (value.indexOf(' ') !== -1)
    validationErrors.push(new Spaces());

    return validationErrors;
  };


export const siteLocalizer: Localizer =
  (error: ValidationError): string | null => {
    switch (error.guid.str) {
      case StartsNotWithSchema.kGuid:
        return localization.localize("ValidationErrorStartsNotWithSchema");
      case Spaces.kGuid:
        return localization.localize("ValidationErrorSpaces");
    }

    return null;
  };
