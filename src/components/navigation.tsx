import type { Component } from "solid-js";
import { Database, Penkr, Folder, CodeBlock, Setting } from "../assets/icons";

const Navigation: Component = () => {
  return (
    <div class="flex flex-col justify-between items-center bg-zinc-800 w-12">
      <nav class="flex flex-col items-center">
        <a class="py-8" href="/">
          <Penkr class="w-6 h-6" />
        </a>
        <ul>
          <li>
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <Database class="w-5 h-5" />
            </a>
          </li>
          <li>
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <Folder class="w-6 h-6" />
            </a>
          </li>
          <li>
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <CodeBlock class="w-6 h-6" />
            </a>
          </li>
          <li>
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <Setting class="w-6 h-6" />
            </a>
          </li>
        </ul>
      </nav>
      <a
        class="flex items-center justify-center w-8 h-8 my-4 rounded-full"
        href="#"
      >
        <img
          class="rounded-full"
          src="https://api.dicebear.com/5.x/shapes/svg"
          alt="avatar"
        />
      </a>
    </div>
  );
};

export default Navigation;
