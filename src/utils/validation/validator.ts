import {Guid} from "../guid/index";


export abstract class ValidationError {
  constructor (public readonly guid: Guid) {}
};

export type ValidationRule = (value: string) => ValidationError[];
export type Localizer = (error: ValidationError) => string;
export type Prioritizer = (error: ValidationError[]) => ValidationError;

export class Validator {
  constructor (
    private readonly rules: ValidationRule[],
    public readonly localize: Localizer =
      (error: ValidationError): string => error.guid.str,
    public readonly prioritize: Prioritizer =
      (errors: ValidationError[]): ValidationError => errors[0],
  ) {}

  validate (value: string): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const rule of this.rules)
      errors.push(... rule(value));

    return [... new Set<ValidationError>(errors)];
  }
};
