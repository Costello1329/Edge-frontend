import React from "react";
import {Validator, ValidationError} from "../../../utils/validation/validator";
import {discard} from "../../../utils/discard";



export interface InputProps {
  title: string,
  initialValue?: string,
  id: string,
  type: "text" | "password",
  validator: Validator,
  changeCallback?: (value: string, validationError: ValidationError | null) => void
};

interface InputState {
  value: string,
  validationError: ValidationError | null
}

export class Input extends React.Component<InputProps, InputState> {
  mounted: boolean;
  
  constructor (props: InputProps) {
    super(props);
    this.mounted = false;
  
    const value: string = this.props.initialValue ?? "";

    this.state = {
      value,
      validationError: null
    };

    /// Dry-run.
    this.changeCallback(
      value,
      this.getValidationError(this.props.validator, value)
    );
  }

  private readonly changeCallback =
    (value: string, validationError: ValidationError | null): void => {
      if (this.props.changeCallback !== undefined)
        this.props.changeCallback(value, validationError);
    }

  private getValidationError (
    validator: Validator,
    value: string
  ): ValidationError | null {
    const errors: ValidationError[] =
      validator.validate(value);

    return errors.length !== 0 ? validator.prioritize(errors) : null;
  }

  private handleChange (value: string): void {
    const validationError: ValidationError | null =
      this.getValidationError(this.props.validator, value);

    this.setState(
      { value, validationError },
      (): void => this.changeCallback(value, validationError)
    );
  }

  public componentDidMount = (): void =>
    discard(this.mounted = true);
  

  public componentWillUnmount = (): void =>
    discard(this.mounted = false);

  public componentDidUpdate (prevProps: InputProps): void {
    if (!this.mounted)
      return;

    const prevValidationError: ValidationError | null =
    this.getValidationError(prevProps.validator, this.state.value);

    const validationError: ValidationError | null =
      this.getValidationError(this.props.validator, this.state.value);
    
    if ((
      ((prevValidationError === null) && (validationError !== null)) ||
      ((prevValidationError !== null) && (validationError === null))
    ) || (
      ((prevValidationError !== null) && (validationError !== null)) &&
      (prevValidationError.guid.str !== validationError.guid.str)
    ))
      this.setState(
        { validationError },
        (): void => this.changeCallback(this.state.value, validationError)
      );
  }

  public readonly render = (): JSX.Element => {
    return <div className = "input-field">
      <input
        id = {this.props.id}
        type = {this.props.type}
        value = {this.state.value}
        onChange = {
          (event: React.ChangeEvent<HTMLInputElement>): void =>
            this.handleChange(event.target.value)
        }
      />
      <label htmlFor = {this.props.id}>{this.props.title}</label>
      {
        this.state.validationError !== null ?
        <span>
          {this.props.validator.localize(this.state.validationError)}
        </span> :
        <></>
      }
    </div>
  };
};
