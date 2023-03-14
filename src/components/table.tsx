import { Accessor, Component, createResource, For, Show } from "solid-js";

async function getRecords(table_name: string) {
  let res = await (
    await fetch(`http://localhost:4000/api/collections/${table_name}/records`)
  ).json();
  return res.data;
}

interface Props {
  table_name: Accessor<string>;
}

const Table: Component<Props> = (props) => {
  const [records] = createResource(props.table_name, getRecords);

  return (
    <Show
      when={!records.loading && records().length > 0}
      fallback={
        <div class="flex items-center justify-center h-20">
          Loading<span class="dot-loader"></span>
        </div>
      }
    >
      <div class="table-container sc">
        <table class="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <For each={Object.keys(records()[0])}>
                {(key) => <th>{key}</th>}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={records()}>
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
    </Show>
  );
};

export default Table;
