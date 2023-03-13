import type { Component, ParentProps } from "solid-js";

interface ButtonProps extends ParentProps {
  class?: string;
}

const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      class="btn"
      classList={{
        [props.class || ""]: true,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
