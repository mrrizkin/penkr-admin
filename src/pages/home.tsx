import type { Component } from "solid-js";
import Base from "../layouts/base";

const Home: Component = () => {
  return (
    <Base>
      <div class="flex flex-1 overflow-auto bg-zinc-900 overflow-auto sc">
        <div class="flex-1 flex flex-col p-4 max-w-6xl mx-auto">
          <div class="flex items-center gap-x-2 mb-4 text-zinc-300">
            <span class="font-bold text-lg">Dashboard</span>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
