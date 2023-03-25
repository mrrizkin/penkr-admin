import { DropdownMenu } from "@kobalte/core";
import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Database, Penkr, Folder, CodeBlock, Setting } from "../assets/icons";

const Navigation: Component = () => {
  return (
    <div class="flex flex-col justify-between items-center bg-zinc-800 w-12">
      <nav class="flex flex-col items-center">
        <A class="py-8" href="/">
          <Penkr class="w-6 h-6" />
        </A>
        <ul>
          <li>
            <A
              class="flex items-center justify-center w-12 h-12"
              href="/collections"
            >
              <Database class="w-5 h-5" />
            </A>
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
            <A
              class="flex items-center justify-center w-12 h-12"
              href="/settings"
            >
              <Setting class="w-6 h-6" />
            </A>
          </li>
        </ul>
      </nav>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="dropdown-menu__trigger">
          <div class="flex items-center justify-center w-8 h-8 my-4 rounded-full cursor-pointer">
            <img
              class="rounded-full"
              src="https://api.dicebear.com/5.x/shapes/svg"
              alt="avatar"
            />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content class="dropdown-menu__content">
            <DropdownMenu.Item class="dropdown-menu__item">
              Logout
            </DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navigation;
