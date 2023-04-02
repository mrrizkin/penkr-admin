import { Component, For, Match, Switch } from "solid-js";
import { Dialog } from "@kobalte/core";
import FormGroup from "../form-group";
import Button from "../button";
import { Icons } from "../../assets";

interface Props {
  collection: any;
}

const NewRecord: Component<Props> = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger class="btn btn-primary">New Record</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content overflow-y-auto sc">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">New Record</Dialog.Title>
              <Dialog.CloseButton class="btn">
                <Icons.CrossIcon />
              </Dialog.CloseButton>
            </div>
            <form>
              <For each={props.collection.columns}>
                {(column) => {
                  return (
                    <FormGroup
                      label={column.column_name}
                      mandatory={column.is_nullable === "NO"}
                      class="mb-4"
                      name={column.column_name}
                    >
                      <Switch
                        fallback={<input type="text" class="form-control" />}
                      >
                        <Match when={column.data_type === "character varying"}>
                          <input type="text" class="form-control" />
                        </Match>
                        <Match when={column.data_type === "integer"}>
                          <input type="number" class="form-control" />
                        </Match>
                        <Match when={column.data_type === "boolean"}>
                          <input type="checkbox" class="form-control" />
                        </Match>
                      </Switch>
                    </FormGroup>
                  );
                }}
              </For>
              <div class="flex gap-x-4">
                <Dialog.CloseButton class="btn">Cancel</Dialog.CloseButton>
                <Button type="submit" class="btn-primary">
                  Save
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewRecord;
