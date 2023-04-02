import { DropdownMenu } from "@kobalte/core";
import { A, useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { Database, Penkr, Folder, CodeBlock, Setting } from "../assets/icons";

const Navigation: Component = () => {
  const navigate = useNavigate();

  function signOut() {
    console.log("sign out");
    navigate("/auth");
  }

  return (
    <div class="flex flex-col justify-between items-center bg-zinc-800 w-12">
      <nav class="flex flex-col items-center">
        <A class="py-6 hover:text-pink-600" href="/">
          <Penkr class="w-6 h-6" />
        </A>
        <ul>
          <li class="hover:text-pink-600">
            <A
              class="flex items-center justify-center w-12 h-12"
              href="/collections"
            >
              <Database class="w-5 h-5" />
            </A>
          </li>
          <li class="hover:text-pink-600">
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <Folder class="w-6 h-6" />
            </a>
          </li>
          <li class="hover:text-pink-600">
            <a class="flex items-center justify-center w-12 h-12" href="#">
              <CodeBlock class="w-6 h-6" />
            </a>
          </li>
          <li class="hover:text-pink-600">
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
          <DropdownMenu.Content class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right rounded-md shadow-xl bg-zinc-800">
            <DropdownMenu.Item
              onSelect={signOut}
              class="flex items-center p-3 text-sm capitalize transition-colors duration-300 transform text-zinc-300 hover:bg-zinc-700 hover:text-white cursor-pointer"
            >
              <svg
                class="w-5 h-5 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span class="mx-1">Sign Out</span>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navigation;
