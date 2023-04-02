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
import { Icons } from "../assets";
import { ColumnDef } from "@tanstack/solid-table";
import NoCollectionSelected from "../components/organism/no-collection-selected";
import NewRecord from "../components/forms/new-record";
import { database } from "../api";
import Breadcrumbs from "../components/organism/breadcrumbs";
import LoadingRecord from "../components/organism/loading-records";

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
      class="text-pink-500 rounded bg-zinc-900 ring-offset-zinc-900 border-zinc-700 focus:ring-pink-300 focus:border-pink-300"
      classList={{
        [others.class || ""]: true,
      }}
      {...others}
    />
  );
};

interface BreadcrumbsSignal {
  label: string;
  href?: string;
}

const Collections: Component = () => {
  const [collections, { mutate }] = createResource(
    { force: false }, // this fetch is heavy so we cache it, but we can force it to refetch
    database.getCollections
  );
  const [filteredCollections, setFilteredCollections] = createSignal(
    collections()
  );
  const [currentCollection, setCurrentCollection] = createSignal<any>(null);
  const [records, { refetch }] = createResource(
    currentCollection,
    database.getRecords
  );
  const [columnDef, setColumnDef] = createSignal<ColumnDef<any>[]>(
    createColumnDef([])
  );
  const [clicked, setClicked] = createSignal(false);
  const [breadcrumbs, setBreadcrumbs] = createSignal<BreadcrumbsSignal[]>([
    {
      label: "Collections",
      href: "/collections",
    },
  ]);

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
    setBreadcrumbs([
      {
        label: "Collections",
        href: "/collections",
      },
      {
        label: collection.table_name,
      },
    ]);
  }

  async function refetchCollections() {
    setClicked(true);
    database
      .getCollections({
        force: true,
      })
      .then((res) => {
        mutate(res);
        refetch();
        setClicked(false);
      });
  }

  return (
    <Base>
      <div class="flex flex-1 overflow-auto">
        <div class="space-y-2 w-xs mx-auto p-2 text-sm overflow-auto border-r border-zinc-800 sc">
          <div class="relative flex items-center px-2 pt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mx-3 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              onInput={filterCollections}
              class="block w-full py-1.5 pr-5 border rounded-lg md:w-80 placeholder-zinc-400/70 pl-11 rtl:pr-11 rtl:pl-5 bg-zinc-900 text-zinc-300 border-zinc-600 focus:border-pink-300 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {collections.loading ? (
            <LoadingRecord />
          ) : (
            <For each={filteredCollections()}>
              {(collection) => (
                <div
                  class="flex items-center flex-start gap-x-2 p-2 rounded hover:(bg-zinc-800) cursor-pointer"
                  classList={{
                    "bg-zinc-800":
                      currentCollection()?.table_name === collection.table_name,
                  }}
                  onClick={() => changeCollection(collection)}
                >
                  <Switch fallback={<Icons.TableIcon />}>
                    <Match when={collection.table_type == "BASE TABLE"}>
                      <Icons.TableIcon />
                    </Match>
                    <Match when={collection.table_type == "View TABLE"}>
                      <Icons.ViewsIcon />
                    </Match>
                  </Switch>
                  <span>{collection.table_name}</span>
                </div>
              )}
            </For>
          )}
        </div>
        <div class="flex-1 overflow-auto flex flex-col">
          <section class="flex p-4 flex-1 flex-col gap-y-4 overflow-auto">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div>
                <Breadcrumbs items={breadcrumbs()} />
              </div>

              <div class="flex items-center gap-x-3">
                <Button icon={Icons.Setting}>Settings</Button>
                <Button>API Overview</Button>
                <NewRecord collection={currentCollection()} />
              </div>
            </div>

            <div class="md:flex md:items-center md:justify-between">
              <div class="btn-group">
                <Button
                  disabled={collections.loading || records.loading || clicked()}
                  onClick={refetchCollections}
                  icon={
                    <Icons.RefreshIcon
                      classList={{
                        "anim-spin":
                          collections.loading || records.loading || clicked(),
                      }}
                    />
                  }
                >
                  Refresh
                </Button>
                <Button
                  disabled={collections.loading || records.loading || clicked()}
                  icon={Icons.FilterIcon}
                >
                  Filter
                </Button>
                <Button
                  disabled={collections.loading || records.loading || clicked()}
                  icon={Icons.EyeIcon}
                >
                  View
                </Button>
              </div>

              <div class="relative flex items-center">
                <span class="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 mx-3 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  class="block w-full py-1.5 pr-5 border rounded-lg md:w-80 placeholder-zinc-400/70 pl-11 rtl:pr-11 rtl:pl-5 bg-zinc-900 text-zinc-300 border-zinc-600 focus:border-pink-300 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>

            <div class="flex flex-1 flex-col overflow-auto">
              <Show
                when={currentCollection() !== null}
                fallback={<NoCollectionSelected />}
              >
                <Table records={records} columnDef={columnDef} />
              </Show>
            </div>

            <div class="sm:flex sm:items-center sm:justify-between ">
              <div class="text-sm text-gray-400">
                Page <span class="font-medium text-gray-100">1 of 10</span>
              </div>

              <div class="flex items-center gap-x-4 sm:mt-0">
                <Button
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>
                  }
                >
                  Previous
                </Button>
                <Button
                  direction="right"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Base>
  );
};

export default Collections;
