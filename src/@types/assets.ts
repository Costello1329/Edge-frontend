declare module "\*.svg" {
  import React = require("react");
  const content: React.FunctionComponent<React.SVGProps<SVGElement>>;
  export default content;
}
