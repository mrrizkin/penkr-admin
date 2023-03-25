import type { Component } from "solid-js";
import Base from "../layouts/base";
import { Tabs } from "@kobalte/core";

const Home: Component = () => {
  return (
    <Base>
      <div class="flex flex-1 overflow-auto bg-zinc-900 overflow-auto sc">
        <div class="flex-1 flex flex-col p-4 max-w-4xl mx-auto">
          <div class="flex items-center gap-x-2 mb-4 text-zinc-300">
            <span class="font-bold text-lg">Dashboard</span>
          </div>
          <Tabs.Root aria-label="Main navigation" class="tabs">
            <Tabs.List class="tabs__list">
              <Tabs.Trigger class="tabs__trigger" value="profile">
                Home
              </Tabs.Trigger>
              <Tabs.Trigger class="tabs__trigger" value="dashboard">
                Metric
              </Tabs.Trigger>
              <Tabs.Trigger class="tabs__trigger" value="settings">
                Request Logger
              </Tabs.Trigger>
              <Tabs.Indicator class="tabs__indicator" />
            </Tabs.List>
            <Tabs.Content class="tabs__content" value="profile">
              Profile details
            </Tabs.Content>
            <Tabs.Content class="tabs__content" value="dashboard">
              Dashboard details
            </Tabs.Content>
            <Tabs.Content class="tabs__content" value="settings">
              Settings details
            </Tabs.Content>
            <Tabs.Content class="tabs__content" value="contact">
              Contact details
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </Base>
  );
};

export default Home;
