import type { Component, ParentProps } from "solid-js";
import Navigation from "../components/navigation";

const Base: Component<ParentProps> = (props) => {
  return (
    <div class="flex min-h-screen max-h-screen overflow-hidden">
      <Navigation />
      <div class="flex flex-1 overflow-auto">{props.children}</div>
    </div>
  );
};

export default Base;
