import type { Component, ParentProps } from "solid-js";

interface FormGroupProps extends ParentProps {
  label?: string;
  name: string;
  class?: string;
  mandatory?: boolean;
}

const FormGroup: Component<FormGroupProps> = (props) => {
  return (
    <div
      class="form-group"
      classList={{
        [props.class || ""]: true,
      }}
    >
      <div class="form-group-header">
        <label
          for={props.name}
          classList={{
            mandatory: !!props.mandatory,
          }}
        >
          {props.label}
        </label>
      </div>
      <div class="form-group-body">{props.children}</div>
    </div>
  );
};

export default FormGroup;
