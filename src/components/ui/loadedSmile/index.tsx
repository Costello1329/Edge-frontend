import React from "react";

import "./styles.scss";



interface LoadedSmile {
  type: "success" | "error"
}

export const LoadedSmile =
  (props: LoadedSmile): JSX.Element =>
    <div className = "loadedSmile">{(() => {
      switch (props.type) {
        case "success":
          return <i className="material-icons medium loadedSmile">mood_good</i>;
        case "error":
          return <i className="material-icons medium loadedSmil">mood_bad</i>;
      }
    })()}</div>;
