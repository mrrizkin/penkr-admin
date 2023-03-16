import type { Component, ParentProps } from "solid-js";

interface Props extends ParentProps {
  heading: string;
}

const Blankstate: Component<Props> = (props) => {
  return (
    <div class="blankstate">
      <h3 class="blankstate-heading">{props.heading}</h3>
      {props.children}
    </div>
  );
};

export default Blankstate;
