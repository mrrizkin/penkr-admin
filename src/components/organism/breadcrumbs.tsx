import { A } from "@solidjs/router";
import { Component, For } from "solid-js";
import { Icons } from "../../assets";

type BreadcrumbsItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  class?: string;
  items: BreadcrumbsItem[];
}

const Breadcrumbs: Component<BreadcrumbsProps> = (props) => {
  return (
    <div class="flex items-center gap-x-3">
      <div class="flex items-center overflow-x-auto whitespace-nowrap">
        <A href="/" class="text-gray-200">
          <Icons.HomeIcon />
        </A>
        <For each={props.items}>
          {(item) => (
            <>
              <span class="mx-3 text-gray-300 rtl:-scale-x-100">
                <Icons.ChevronIcon />
              </span>

              <A
                href={item.href || "#"}
                classList={{
                  "text-pink-400": !item.href,
                  "text-zinc-200 hover:underline": !!item.href,
                }}
              >
                {item.label}
              </A>
            </>
          )}
        </For>
      </div>
    </div>
  );
};

export default Breadcrumbs;
