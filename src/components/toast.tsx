import { Toast, toaster } from "@kobalte/core";
import { JSX } from "solid-js/jsx-runtime";
import { Switch, Match } from "solid-js/web";

function show(message: string) {
  return toaster.show((props) => (
    <Toast.Root toastId={props.toastId} class="toast">
      <div class="toast__content">
        <div>
          <Toast.Title class="toast__title">{message}</Toast.Title>
        </div>
        <Toast.CloseButton class="toast__close-button">x</Toast.CloseButton>
      </div>
      <Toast.ProgressTrack class="toast__progress-track">
        <Toast.ProgressFill class="toast__progress-fill" />
      </Toast.ProgressTrack>
    </Toast.Root>
  ));
}

function success(message: string) {
  return toaster.show((props) => (
    <Toast.Root toastId={props.toastId} class="toast toast--success">
      <div class="flex items-center justify-center w-12 bg-emerald-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-emerald-400">Success</span>
          <p class="text-sm text-gray-200">{message}</p>
        </div>
      </div>
    </Toast.Root>
  ));
}

function error(message: string) {
  return toaster.show((props) => (
    <Toast.Root toastId={props.toastId} class="toast toast--error">
      <div class="flex items-center justify-center w-12 bg-red-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-red-400">Error</span>
          <p class="text-sm text-gray-200">{message}</p>
        </div>
      </div>
    </Toast.Root>
  ));
}

function promise<T, U>(
  promise: Promise<T> | (() => Promise<T>),
  options: {
    loading?: JSX.Element;
    success?: (data: T) => JSX.Element;
    error?: (error: U) => JSX.Element;
  }
) {
  return toaster.promise(promise, (props) => (
    <Toast.Root
      toastId={props.toastId}
      classList={{
        toast: true,
        "toast-loading": props.state === "pending",
        "toast-success": props.state === "fulfilled",
        "toast-error": props.state === "rejected",
      }}
    >
      <Switch>
        <Match when={props.state === "pending"}>{options.loading}</Match>
        <Match when={props.state === "fulfilled"}>
          {options.success?.(props.data)}
        </Match>
        <Match when={props.state === "rejected"}>
          {options.error?.(props.error)}
        </Match>
      </Switch>
    </Toast.Root>
  ));
}

function custom(jsx: () => JSX.Element) {
  return toaster.show((props) => (
    <Toast.Root toastId={props.toastId}>{jsx}</Toast.Root>
  ));
}

function dismiss(id: number) {
  return toaster.dismiss(id);
}

const toast = {
  show,
  success,
  error,
  promise,
  custom,
  dismiss,
};

export default toast;
