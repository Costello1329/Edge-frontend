import {Guid} from "../guid/index";


export abstract class ValidationError {
  constructor (public readonly guid: Guid) {}
};

export type ValidationRule = (value: string) => ValidationError[];
export type Localizer = (error: ValidationError) => string | null;
export type Prioritizer = (error: ValidationError[]) => ValidationError;

export class Validator {
  public readonly validate: ValidationRule;
  public readonly localize: Localizer;
  public readonly prioritize: Prioritizer;

  private static combineRules =
    (rules: ValidationRule[]): ValidationRule =>
      (value: string): ValidationError[] => {
        const errors: ValidationError[] = [];
    
        for (const rule of rules)
          errors.push(... rule(value));
    
        return [... new Set<ValidationError>(errors)];
      };

  private static combineLocalizers =
    (localizers: Localizer[]): Localizer =>
      (error: ValidationError): string | null => {
        for (const localizer of localizers) {
          const localized: string | null = localizer(error);

          if (localized !== null)
            return localized;
        }

        return null;
      };

  private static commonPrioritizer =
    (errors: ValidationError[]): ValidationError => errors[0];

  constructor (
    rules: ValidationRule[],
    localizers: Localizer[] = [],
    prioritizer: Prioritizer = Validator.commonPrioritizer
  ) {
    this.validate = Validator.combineRules(rules);
    this.localize = Validator.combineLocalizers(localizers);
    this.prioritize = prioritizer;
  }
};
