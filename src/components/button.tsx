import { Component, JSX, ParentProps, splitProps } from "solid-js";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  class?: string;
  disabled?: boolean;
}

const Button: Component<ParentProps<ButtonProps>> = (props) => {
  const [local, others] = splitProps(props, ["class", "disabled", "children"]);
  return (
    <button
      class="btn"
      classList={{
        [local.class || ""]: true,
      }}
      disabled={local.disabled}
      {...others}
    >
      {local.children}
    </button>
  );
};

export default Button;
