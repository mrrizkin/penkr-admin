import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/solid-table";
import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  For,
  Resource,
  Show,
} from "solid-js";
import Blankstate from "./blankstate";

interface Props {
  records: Resource<any>;
  columnDef: Accessor<ColumnDef<any>[]>;
}

const Table: Component<Props> = (props) => {
  const [rowSelection, setRowSelection] = createSignal({});

  let table = createSolidTable({
    get data() {
      return props.records() || [];
    },
    state: {
      rowSelection: rowSelection(),
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    columns: props.columnDef(),
    getCoreRowModel: getCoreRowModel(),
  });

  createEffect(() => {
    table = createSolidTable({
      get data() {
        return props.records() || [];
      },
      state: {
        rowSelection: rowSelection(),
      },
      enableRowSelection: true,
      enableMultiRowSelection: true,
      onRowSelectionChange: setRowSelection,
      columns: props.columnDef(),
      getCoreRowModel: getCoreRowModel(),
    });
  });

  return (
    <Show
      when={!props.records.loading}
      fallback={
        <div class="flex items-center justify-center h-20">
          Loading<span class="dot-loader"></span>
        </div>
      }
    >
      <div class="table-container sc">
        <table class="table">
          <thead>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </thead>
          <tbody>
            <For each={table.getRowModel().rows}>
              {(row) => (
                <tr>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <Show when={props.records().length === 0}>
          <Blankstate heading="No records found">
            <p class="text-center">
              You don't have any records in this collection.
            </p>
          </Blankstate>
        </Show>
      </div>
    </Show>
  );
};

export default Table;
