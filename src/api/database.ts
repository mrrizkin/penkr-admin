import toast from "solid-toast";


export async function getCollections(arg: any) {
  try {
    if (!arg.force) {
      let res = localStorage.getItem("collections");
      if (res) {
        return JSON.parse(res);
      }
    }
    let host = window.location.host.split(":")[0];
    let res = await (
      await fetch("http://" + host + ":4000/api/collections")
    ).json();
    localStorage.setItem("collections", JSON.stringify(res.data));
    toast.success("Collections fetched successfully");
    return res.data;
  } catch (err: any) {
    toast.error(err.message);
    return [];
  }
}

export async function getRecords(collection: any) {
  try {
    let host = window.location.host.split(":")[0];
    let res = await (
      await fetch(
        `http://${host}:4000/api/collections/${collection.table_name}/records`
      )
    ).json();
    toast.success("Records fetched successfully");
    return res.data;
  } catch (err: any) {
    toast.error(err.message);
    return [];
  }
}
