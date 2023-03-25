import type { Component } from "solid-js";
import Blankstate from "../blankstate";

const NoCollectionSelected: Component = () => {
  return (
    <div class="flex-1 flex flex-col justify-center">
      <Blankstate heading="No Collection Selected">
        <p>Select a collection from the left sidebar to view its records</p>
      </Blankstate>
    </div>
  );
};

export default NoCollectionSelected;
