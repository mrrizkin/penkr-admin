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
import Blankstate from "../components/blankstate";

async function getCollections(arg: any) {
  if (!arg.force) {
    let res = localStorage.getItem("collections");
    if (res) {
      return JSON.parse(res);
    }
  }
  let res = await (await fetch("http://localhost:4000/api/collections")).json();
  localStorage.setItem("collections", JSON.stringify(res.data));
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
      cell: (info: any) => {
        let cell = info.getValue() ?? <span class="text-zinc-500">N\\A</span>;
        if (cell === true || cell === false) {
          cell = <span>{JSON.stringify(cell)}</span>;
        }
        return cell;
      },
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
  const [collections, { mutate }] = createResource(
    { force: false }, // this fetch is heavy so we cache it, but we can force it to refetch
    getCollections
  );
  const [filteredCollections, setFilteredCollections] = createSignal(
    collections()
  );
  const [currentCollection, setCurrentCollection] = createSignal<any>(null);
  const [records, { refetch }] = createResource(currentCollection, getRecords);
  const [columnDef, setColumnDef] = createSignal<ColumnDef<any>[]>(
    createColumnDef([])
  );
  const [clicked, setClicked] = createSignal(false);

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
    if (currentCollection() !== null) {
      setColumnDef(createColumnDef(currentCollection().columns));
    }
  });

  createEffect(() => {
    if (!collections.loading) {
      setFilteredCollections(collections());
    }
  });

  function changeCollection(collection: any) {
    setCurrentCollection(collection);
  }

  async function refetchCollections() {
    setClicked(true);
    getCollections({
      force: true,
    }).then((res) => {
      mutate(res);
      refetch();
      setClicked(false);
    });
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
                  classList={{
                    "bg-zinc-800":
                      currentCollection()?.table_name === collection.table_name,
                  }}
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
          <Show
            when={currentCollection() !== null}
            fallback={
              <div class="flex-1 flex flex-col justify-center">
                <Blankstate heading="no collection selected">
                  <p>
                    select a collection from the left sidebar to view its
                    records
                  </p>
                </Blankstate>
              </div>
            }
          >
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
                  <span class="font-bold">
                    {currentCollection().table_name}
                  </span>
                </Show>
                <Button
                  disabled={collections.loading || records.loading || clicked()}
                  onClick={refetchCollections}
                >
                  <RefreshIcon
                    classList={{
                      "anim-spin": collections.loading || records.loading,
                    }}
                  />
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
          </Show>
        </div>
      </div>
    </Base>
  );
};

export default Collections;
