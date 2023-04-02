import type { Component } from "solid-js";
import Button from "../button";

const NoRecordFound: Component = () => {
  return (
    <div class="flex items-center text-center h-96">
      <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div class="p-3 mx-auto text-pink-500 rounded-full bg-pink-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h1 class="mt-3 text-lg text-white">No Record Found</h1>
        <p class="mt-2 text-gray-400">
          Seem like you don't have any record in this collection. Add a new
          record or refetch.
        </p>
        <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
          <Button>Refetch</Button>
          <Button class="btn-primary">New Record</Button>
        </div>
      </div>
    </div>
  );
};

export default NoRecordFound;
