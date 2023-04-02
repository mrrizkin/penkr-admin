import { Component, JSX, ParentProps, splitProps } from "solid-js";
import { Button as KobalteButton } from "@kobalte/core";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: JSX.Element;
  direction?: "left" | "right";
}

const Button: Component<ParentProps<ButtonProps>> = (props) => {
  const [local, others] = splitProps(props, [
    "type",
    "class",
    "disabled",
    "children",
    "icon",
    "direction",
  ]);

  return (
    <KobalteButton.Root
      class="btn"
      classList={{
        [local.class || ""]: true,
        ["icon-right"]: !!local.icon && local.direction === "right",
      }}
      type={local.type}
      disabled={local.disabled}
      {...others}
    >
      {local.icon && local.children ? (
        <>
          {local.icon}
          <span class="mx-1">{local.children}</span>
        </>
      ) : (
        local.children
      )}
    </KobalteButton.Root>
  );
};

export default Button;
