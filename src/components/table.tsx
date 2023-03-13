import { Component, For } from "solid-js";

import data from "./MOCK_DATA.json";

const Table: Component = () => {
  return (
    <div class="table-container sc">
      <table class="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <For each={Object.keys(data[0])}>{(key) => <th>{key}</th>}</For>
          </tr>
        </thead>
        <tbody>
          <For each={data}>
            {(row) => (
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <For each={Object.values(row)}>
                  {(value: any) => (
                    <td>
                      {typeof value == "boolean"
                        ? value
                          ? "True"
                          : "False"
                        : value}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
