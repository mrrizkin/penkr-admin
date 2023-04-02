import type { Component } from "solid-js";
import Spinner from "../spinner";

const LoadingRecord: Component = () => {
  return (
    <div class="flex items-center text-center h-96">
      <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
        <Spinner />
        <p class="mt-2 text-gray-400">
          Loading<span class="dot-loader"></span>
        </p>
      </div>
    </div>
  );
};

export default LoadingRecord;
