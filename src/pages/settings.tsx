import { Component, createSignal, For, JSX } from "solid-js";
import Button from "../components/button";
import Base from "../layouts/base";
import { AppSetIcon, EmailSetIcon, StorageSetIcon } from "../assets/icons";
import FormGroup from "../components/form-group";
import Select from "../components/select";
import Breadcrumbs from "../components/organism/breadcrumbs";

interface MenuItems {
  name: string;
  path: string;
  icon: JSX.Element;
}

const settings_menu = {
  system: [
    {
      name: "Application",
      path: "/application",
      icon: <AppSetIcon />,
    },
    {
      name: "Email",
      path: "/email",
      icon: <EmailSetIcon />,
    },
    {
      name: "File Storage",
      path: "/storage",
      icon: <StorageSetIcon />,
    },
  ] as MenuItems[],
};

const databases = [
  {
    value: "postgres",
    label: "PostgreSQL",
  },
  { value: "mysql", label: "MySQL" },
  {
    value: "sqlite",
    label: "SQLite",
  },
];

interface BreadcrumbsSignal {
  label: string;
  href?: string;
}

const Settings: Component = () => {
  const [breadcrumbs, setBreadcrumbs] = createSignal<BreadcrumbsSignal[]>([
    {
      label: "Settings",
      href: "/setting",
    },
  ]);

  return (
    <Base>
      <div class="flex flex-1 overflow-auto">
        <div class="h-screen px-5 py-8 overflow-y-auto border-r w-xs bg-zinc-900 border-zinc-700">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              class="w-full py-1.5 pl-10 pr-4 border rounded-md bg-zinc-900 text-zinc-300 border-zinc-600 focus:border-pink-300 focus:ring-pink-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              placeholder="Search"
            />
          </div>

          <nav class="mt-4 -mx-3 space-y-6">
            <For each={Object.keys(settings_menu)}>
              {(key) => (
                <div class="space-y-3">
                  <label class="px-3 text-xs uppercase text-zinc-400">
                    {key}
                  </label>
                  {/* @ts-ignore: the key is a valid key of settings_menu */}
                  <For each={settings_menu[key]}>
                    {(setting) => (
                      <>
                        <a
                          class="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-zinc-200"
                          href={"/settings" + setting.path}
                        >
                          {setting.icon}

                          <span class="mx-2 text-sm font-medium">
                            {setting.name}
                          </span>
                        </a>
                      </>
                    )}
                  </For>
                </div>
              )}
            </For>
          </nav>
        </div>
        <div class="flex-1 overflow-auto p-4 sc flex flex-col bg-zinc-900">
          <div class="flex items-center gap-x-2 mb-4 text-zinc-300">
            <Breadcrumbs items={breadcrumbs()} />
          </div>
          <div class="px-4 py-6 bg-zinc-800 rounded-lg">
            <form>
              <h3 class="font-bold text-zinc-400 mb-4">Application</h3>
              <div class="flex flex-wrap gap-4 w-full mb-4">
                <FormGroup
                  class="flex-1"
                  label="Name"
                  name="application_name"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    name="application_name"
                    id="application_name"
                  />
                </FormGroup>
                <FormGroup
                  class="flex-1"
                  label="URL"
                  name="application_url"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="URL"
                    name="application_url"
                    id="application_url"
                  />
                </FormGroup>
              </div>
              <FormGroup
                class="my-4"
                label="Max logging retention (days)"
                name="max_logging_days"
                mandatory
              >
                <input
                  type="number"
                  class="form-control"
                  placeholder="days"
                  name="max_logging_days"
                  id="max_logging_days"
                />
              </FormGroup>
              <hr class="bg-zinc-700 border-zinc-700 my-8" />
              <h3 class="font-bold text-zinc-400 mb-4">Database</h3>
              <div class="flex flex-wrap gap-4 w-full mb-4">
                <FormGroup
                  class="flex-1"
                  label="Driver"
                  name="database_driver"
                  mandatory
                >
                  <Select
                    id="database_driver"
                    name="database_driver"
                    class="w-full"
                    options={databases}
                  />
                </FormGroup>
                <FormGroup
                  class="flex-1"
                  label="Name"
                  name="database_name"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    name="database_name"
                    id="database_name"
                  />
                </FormGroup>
              </div>
              <div class="flex flex-wrap gap-4 w-full mb-4">
                <FormGroup
                  class="flex-1"
                  label="Username"
                  name="database_username"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    name="database_username"
                    id="database_username"
                  />
                </FormGroup>
                <FormGroup
                  class="flex-1"
                  label="Password"
                  name="database_password"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Password"
                    name="database_password"
                    id="database_password"
                  />
                </FormGroup>
              </div>
              <div class="flex flex-wrap gap-4 w-full mb-4">
                <FormGroup
                  class="flex-1"
                  label="Host"
                  name="database_host"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Host"
                    name="database_host"
                    id="database_host"
                  />
                </FormGroup>
                <FormGroup
                  class="flex-1"
                  label="Port"
                  name="database_port"
                  mandatory
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Port"
                    name="database_port"
                    id="database_port"
                  />
                </FormGroup>
              </div>
              <div class="flex align-center justify-end">
                <Button class="btn-primary">Save changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Settings;
