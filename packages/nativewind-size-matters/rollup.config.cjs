import json from "@rollup/plugin-json";
import path from "path";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: path.resolve("src/index.ts"),
    output: {
      file: path.resolve("dist/index.js"),
      format: "esm",
    },
    plugins: [typescript(), json()],
    external: (id) => /node_modules/.test(id),
  },
];
