import React from "react";
import classNames from "classnames";

import "./styles.scss";



const kAnimationTimeMilliseconds = 300;


interface ErrorTextProps {
  id: string,
  show: boolean,
  text: string
}

interface ErrorTextState {
  animation: "undone" | "done-in" | "done-out";
}

export class ErrorText extends React.Component<ErrorTextProps, ErrorTextState> {
  constructor (props: ErrorTextProps) {
    super(props);
    this.state = { animation: this.props.show ? "done-in" : "done-out" };
  }

  public readonly shouldComponentUpdate =
    (prevProps: ErrorTextProps, prevState: ErrorTextState): boolean =>
      prevProps.show !== this.props.show ||
      prevProps.text !== this.props.text ||
      prevState.animation !== this.state.animation;

  public readonly componentDidUpdate =
    (prevProps: ErrorTextProps): void => {
      if (
        prevProps.show !== this.props.show ||
        prevProps.text !== this.props.text
      ) {
        if (this.props.show)
          this.setState(
            { animation: "undone" },
            (): void =>
              void(setTimeout(
                (): void => {
                  if (this.state.animation === "undone")
                    this.setState({ animation: "done-in"} )
                }, kAnimationTimeMilliseconds
              ))
            );

        else
          this.setState({ animation: "done-out" });
      }
    }

  public readonly render = (): JSX.Element => {
    if (this.props.id === "post-vacancy-form-company-name-error-text")
      console.log(this.state.animation);

    return (
      <span className={classNames([
          "input-error-text",
          this.state.animation !== "undone" ? this.state.animation : ""
        ])}
      >
        {this.props.text}
      </span>
    );
  }
}
