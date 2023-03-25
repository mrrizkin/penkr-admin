import type { Component, JSX, ParentProps } from "solid-js";

interface Props extends ParentProps {
  heading?: string;
  icon?: JSX.Element;
}

const Blankstate: Component<Props> = (props) => {
  return (
    <div class="blankstate">
      {props.icon}
      {props.heading && <h3 class="blankstate-heading">{props.heading}</h3>}
      {props.children}
    </div>
  );
};

export default Blankstate;
