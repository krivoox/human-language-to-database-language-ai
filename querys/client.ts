import fetch from "@/utils/fetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  generate: (prompt: string) => fetch("POST", "/api/generate", { prompt }),
};
