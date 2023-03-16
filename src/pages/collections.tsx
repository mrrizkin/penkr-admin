import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  JSX,
  Match,
  onMount,
  Show,
  splitProps,
  Switch,
} from "solid-js";
import Button from "../components/button";
import Table from "../components/table";
import Base from "../layouts/base";
import {
  TableIcon,
  RefreshIcon,
  Setting,
  ViewSet,
  ViewsIcon,
} from "../assets/icons";
import { ColumnDef } from "@tanstack/solid-table";

async function getCollections() {
  let res = await (await fetch("http://localhost:4000/api/collections")).json();
  return res.data;
}

async function getRecords(collection: any) {
  let res = await (
    await fetch(
      `http://localhost:4000/api/collections/${collection.table_name}/records`
    )
  ).json();
  return res.data;
}

function createColumnDef(columns: any) {
  let columnDef: ColumnDef<any>[] = [];
  if (columns.length > 0) {
    columnDef.push({
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    });
  }

  for (const column of columns) {
    columnDef.push({
      header: column.column_name,
      accessorKey: column.column_name,
    });
  }
  return columnDef;
}

interface IndeterminateCheckboxProps
  extends JSX.HTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
  checked?: boolean;
}

const IndeterminateCheckbox: Component<IndeterminateCheckboxProps> = (
  props
) => {
  let [local, others] = splitProps(props, ["indeterminate", "checked"]);
  let ref: any;

  onMount(() => {
    createEffect(() => {
      if (typeof local.indeterminate === "boolean") {
        ref.indeterminate = !local.checked && local.indeterminate;
      }
    });
  });

  return (
    <input
      type="checkbox"
      ref={ref}
      class="cursor-pointer"
      classList={{
        [others.class || ""]: true,
      }}
      {...others}
    />
  );
};

const Collections: Component = () => {
  const [collections] = createResource(getCollections);
  const [filteredCollections, setFilteredCollections] = createSignal(
    collections()
  );
  const [currentCollection, setCurrentCollection] = createSignal<any>(null);
  const [records] = createResource(currentCollection, getRecords);
  const [columnDef, setColumnDef] = createSignal<ColumnDef<any>[]>(
    createColumnDef([])
  );

  function filterCollections(e: any) {
    const value = e.target.value;
    if (value) {
      setFilteredCollections(
        collections().filter((collection: any) =>
          collection.table_name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredCollections(collections());
    }
  }

  createEffect(() => {
    if (!collections.loading) {
      setFilteredCollections(collections());
      setCurrentCollection(collections()[0]);
      setColumnDef(createColumnDef(collections()[0].columns));
    }
  });

  createEffect(() => {
    if (currentCollection() !== null) {
      setColumnDef(createColumnDef(currentCollection().columns));
    }
  });

  function changeCollection(collection: any) {
    setCurrentCollection(collection);
  }

  return (
    <Base>
      <div class="flex flex-1 overflow-auto">
        <div class="space-y-1 w-xs mx-auto p-1 text-xs overflow-auto border-r border-zinc-800 sc">
          <div class="p-1">
            <input
              type="text"
              class="form-control w-full"
              placeholder="Filter"
              onInput={filterCollections}
            />
          </div>
          {collections.loading ? (
            <div class="flex items-center justify-center h-20">
              Loading<span class="dot-loader"></span>
            </div>
          ) : (
            <For each={filteredCollections()}>
              {(collection) => (
                <div
                  class="flex items-center flex-start gap-x-1 py-1 px-2 rounded hover:(bg-zinc-800) cursor-pointer"
                  onClick={() => changeCollection(collection)}
                >
                  <Switch fallback={<TableIcon />}>
                    <Match when={collection.table_type == "BASE TABLE"}>
                      <TableIcon />
                    </Match>
                    <Match when={collection.table_type == "View TABLE"}>
                      <ViewsIcon />
                    </Match>
                  </Switch>
                  <span>{collection.table_name}</span>
                </div>
              )}
            </For>
          )}
        </div>
        <div class="flex-1 overflow-auto p-4 sc flex flex-col">
          <div class="flex gap-x-4 justify-between mb-4">
            <div class="flex justify-start gap-x-2 items-center">
              <div class="font-bold text-zinc-400">Collection</div>/
              <Show
                when={currentCollection() !== null}
                fallback={
                  <span>
                    Loading<span class="dot-loader"></span>
                  </span>
                }
              >
                <span class="font-bold">{currentCollection().table_name}</span>
              </Show>
              <Button>
                <RefreshIcon />
              </Button>
            </div>
            <div class="flex justitfy-end gap-x-2">
              <Button>
                <Setting />
              </Button>
              <Button>API Overview</Button>
              <Button class="btn-primary">New Record</Button>
            </div>
          </div>
          <div class="flex gap-x-2 mb-4">
            <Button>
              <ViewSet />
            </Button>
            <input
              type="text"
              class="form-control w-full"
              placeholder="Filter"
            />
            <Button>Filter</Button>
          </div>
          <Table records={records} columnDef={columnDef} />
        </div>
      </div>
    </Base>
  );
};

export default Collections;
