import type { Component } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import { Portal } from "solid-js/web";
import { Toast } from "@kobalte/core";

import Collections from "./pages/collections";
import Home from "./pages/home";
import Settings from "./pages/settings";
import Auth from "./pages/auth";

const toast = document.getElementById("toast-root");

if (import.meta.env.DEV && !(toast instanceof HTMLElement)) {
  throw new Error(
    "Toast element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/collections" component={Collections} />
        <Route path="/settings" component={Settings} />
      </Routes>
      <Portal mount={toast!}>
        <Toast.Region duration={5000}>
          <Toast.List class="toast__list" />
        </Toast.Region>
      </Portal>
    </>
  );
};

export default App;
