import { Component, For } from "solid-js";
import Button from "../components/button";
import Base from "../layouts/base";
import { AppSetIcon, EmailSetIcon, StorageSetIcon } from "../assets/icons";
import FormGroup from "../components/form-group";
import Select from "../components/select";

const settings_menu = {
  system: [
    {
      name: "Application",
      icon: <AppSetIcon />,
    },
    {
      name: "Email",
      icon: <EmailSetIcon />,
    },
    {
      name: "File Storage",
      icon: <StorageSetIcon />,
    },
  ],
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

const Settings: Component = () => {
  return (
    <Base>
      <div class="flex flex-1 overflow-auto">
        <div class="space-y-1 w-xs mx-auto p-1 text-sm overflow-auto border-r border-zinc-800 sc">
          <div class="my-2">
            <span class="block text-base m-2 font-bold">System</span>
            <div class="space-y-1">
              <For each={settings_menu.system}>
                {(setting, index) => (
                  <div
                    class="flex items-center flex-start gap-x-2 p-2 rounded hover:(bg-zinc-800) cursor-pointer"
                    classList={{
                      "bg-zinc-800": index() === 0,
                    }}
                  >
                    {setting.icon}
                    <span>{setting.name}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-auto p-4 sc flex flex-col bg-zinc-900">
          <div class="flex items-center gap-x-2 mb-4 text-zinc-300">
            <div class="flex justify-start gap-x-2 items-center font-bold text-zinc-400">
              Settings
            </div>
            /<span class="font-bold">Application</span>
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
