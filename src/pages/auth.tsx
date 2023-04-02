import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { Icons } from "../assets";
import Button from "../components/button";

const Auth: Component = () => {
  const navigate = useNavigate();

  function signIn() {
    navigate("/");
  }

  return (
    <div class="w-full min-h-screen flex justify-center items-center">
      <div>
        <div class="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md bg-zinc-800">
          <div class="px-6 py-4">
            <div class="flex justify-center mx-auto">
              <Icons.Penkr class="w-12 h-12 text-pink-500" />
            </div>

            <h3 class="mt-3 text-xl font-medium text-center text-zinc-200">
              Welcome Back
            </h3>

            <form>
              <div class="w-full mt-4">
                <input
                  class="block w-full px-4 py-2 mt-2 text-zinc-200 border rounded-lg bg-zinc-900 border-zinc-600 placeholder-zinc-400 focus:border-pink-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-pink-300"
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                />
              </div>

              <div class="w-full mt-4">
                <input
                  class="block w-full px-4 py-2 mt-2 text-zinc-200 border rounded-lg bg-zinc-900 border-zinc-600 placeholder-zinc-400 focus:border-pink-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-pink-300"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />
              </div>

              <div class="flex items-center justify-between mt-4">
                <a href="#" class="text-sm text-gray-200 hover:text-gray-500">
                  Forget Password?
                </a>

                <Button class="btn-primary" onClick={signIn}>
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex items-center justify-center py-4 text-center">
          Made with <span class="text-red-500 mx-1">❤</span> from Bandung
        </div>
      </div>
    </div>
  );
};

export default Auth;
