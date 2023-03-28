import unfetch from "isomorphic-unfetch";

export default function fetch(
  method: "GET" | "PATCH" | "POST" | "DELETE" | "PUT",
  path: string,
  body: Record<string, any>,
  headers: Record<string, any> = {},
  mode: RequestInit["mode"] = "cors"
) {
  return unfetch(path, {
    method: method,
    mode,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body:
      ["PATCH", "POST", "PUT"].includes(method) && body
        ? JSON.stringify(body)
        : null,
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((error) => {
      console.log("🚀 ~ file: fetch.ts ~ error:", error);
      return Promise.reject(error);
    });
}
