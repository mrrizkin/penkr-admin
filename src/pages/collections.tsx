import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
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

async function getCollections() {
  let res = await (await fetch("http://localhost:4000/api/collections")).json();
  return res.data;
}

const Collections: Component = () => {
  const [collections] = createResource(getCollections);
  const [filteredCollections, setFilteredCollections] = createSignal(
    collections()
  );
  const [currentCollection, setCurrentCollection] = createSignal("m_user_web");

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
    }
  });

  function changeCollection(collection: string) {
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
                  onClick={() => changeCollection(collection.table_name)}
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
              <span class="font-bold">{currentCollection()}</span>
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
          <Table table_name={currentCollection} />
        </div>
      </div>
    </Base>
  );
};

export default Collections;
