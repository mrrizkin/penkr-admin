import { Component, createSignal, For } from "solid-js";
import Button from "../components/button";
import Table from "../components/table";
import Base from "../layouts/base";
import { TableIcon, RefreshIcon, Setting, ViewSet } from "../assets/icons";

const collections = [
  "loremipsum",
  "dolorsit",
  "ametconsectetur",
  "adipiscing_elit",
  "sed_do_eiusmod",
  "tempor",
  "incididunt",
  "ut_labore_et",
  "dolore",
  "adipiscing_elit",
  "ametconsectetur",
  "dolore",
  "dolorsit",
  "incididunt",
  "loremipsum",
  "sed_do_eiusmod",
  "tempor",
  "ut_labore_et",
];

const Collections: Component = () => {
  const [filteredCollections, setFilteredCollections] =
    createSignal(collections);

  function filterCollections(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    const filtered = collections.filter((collection) =>
      collection.toLowerCase().includes(value)
    );
    setFilteredCollections(filtered);
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
          <For each={filteredCollections()}>
            {(collection) => (
              <div class="flex items-center flex-start gap-x-1 py-1 px-2 rounded hover:(bg-zinc-800) cursor-pointer">
                <TableIcon />
                <span>{collection}</span>
              </div>
            )}
          </For>
        </div>
        <div class="flex-1 overflow-auto p-4 sc flex flex-col">
          <div class="flex gap-x-4 justify-between mb-4">
            <div class="flex justify-start gap-x-2 items-center">
              <div class="font-bold text-zinc-400">Collection</div>/
              <span class="font-bold">Lorem ipsum</span>
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
          <Table />
        </div>
      </div>
    </Base>
  );
};

export default Collections;
