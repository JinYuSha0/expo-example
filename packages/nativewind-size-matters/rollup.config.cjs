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
  {
    input: path.resolve("src/babel/index.ts"),
    output: {
      file: path.resolve("dist/babel.js"),
      format: "cjs",
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      ,
      json(),
    ],
    external: (id) => /node_modules/.test(id),
  },
];
