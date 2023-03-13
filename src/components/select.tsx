import { Component, For } from "solid-js";

type Option = {
  value: string;
  label: string;
};

interface Props {
  options: Option[];
  class?: string;
  name: string;
  id: string;
}

const Select: Component<Props> = (props) => {
  return (
    <select
      id={props.id}
      name={props.name}
      class="form-control"
      classList={{
        [props.class || ""]: true,
      }}
    >
      <For each={props.options}>
        {(option) => <option value={option.value}>{option.label}</option>}
      </For>
    </select>
  );
};

export default Select;
