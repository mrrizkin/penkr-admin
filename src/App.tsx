import { Route, Routes } from "@solidjs/router";
import type { Component } from "solid-js";
import { Toaster } from "solid-toast";
import Collections from "./pages/collections";
import Home from "./pages/home";
import Settings from "./pages/settings";

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/collections" component={Collections} />
        <Route path="/settings" component={Settings} />
      </Routes>
      <Toaster
        position="bottom-right"
        gutter={8}
        toastOptions={{
          style: {
            color: "#fff",
            background: "rgba(63, 63, 70)",
            padding: "0.4em 1em",
          },
        }}
      />
    </>
  );
};

export default App;
