import {Guid} from "../../utils/guid";



export abstract class ValidationError {
  constructor (public readonly guid: Guid) {}
};


export type ValidationRule = (value: string) => ValidationError[];
export type Prioritizer = (errors: ValidationError[]) => ValidationError;
export type Localizer = (error: ValidationError) => string;


export const defaultPrioritizer: Prioritizer =
  (errors: ValidationError[]): ValidationError => errors[0];

export const defaultLocalizer: Localizer =
  (error: ValidationError): string => "";

export class Validator {
  constructor (
    private readonly rules: ValidationRule[],
    private readonly prioritizer: Prioritizer = defaultPrioritizer,
    private readonly localizer: Localizer = defaultLocalizer
  ) {
    this.rules = rules;
    this.prioritizer = prioritizer;
  }

  public validate (value: string): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const rule of this.rules)
      errors.push(... rule(value));

    return [... new Set<ValidationError>(errors)];
  }

  public readonly prioritize =
    (errors: ValidationError[]): ValidationError =>
      this.prioritizer(errors);

  public readonly localize =
    (error: ValidationError): string =>
      this.localizer(error)
};
