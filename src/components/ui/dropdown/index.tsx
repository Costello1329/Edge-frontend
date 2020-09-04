import React from "react";

import "./styles.scss";



export interface DropdownOption {
  text: string,
  callback: () => void
}

export interface DropdownProps {
  id: string,
  options: DropdownOption[]
}

export const Dropdown = (props: DropdownProps): JSX.Element =>
  <ul className="dropdown-content" id={props.id}>{
    props.options.map((option: DropdownOption, index: number): JSX.Element =>
      <li key={`dropdown-${props.id}-option-${index}`}>
        <a onClick = {(): void => option.callback()}>{option.text}</a>
      </li>
    )
  }</ul>;
