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
import LoadingRecord from "./organism/loading-records";
import NoRecordFound from "./organism/no-record-found";
import Spinner from "./spinner";

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
    <Show when={!props.records.loading} fallback={<LoadingRecord />}>
      <div class="table-container">
        <table class="min-w-full divide-y divide-gray-700">
          <thead class="bg-zinc-800 sticky top-0 left-0">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-zinc-400"
                      >
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
          <tbody class="divide-y divide-zinc-700 bg-zinc-900">
            <For each={table.getRowModel().rows}>
              {(row) => (
                <tr>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <td class="p-4 text-sm font-medium whitespace-nowrap max-w-sm overflow-hidden overflow-ellipsis">
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
          <NoRecordFound />
        </Show>
      </div>
    </Show>
  );
};

export default Table;
