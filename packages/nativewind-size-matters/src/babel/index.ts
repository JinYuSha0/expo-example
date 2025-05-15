import type { PluginObj, PluginPass } from "@babel/core";
import * as Babel from "@babel/core";
import { normalizePath, relativePath, removeStartSep, resolve } from "./helper";
import visitorCss from "./visitorCss";

interface InputParams {}

interface InnerAttribute {}

const rootPath = resolve(__dirname, "../");

export default function (
  { types: t }: typeof Babel,
  opt: InputParams
): PluginObj<PluginPass & InnerAttribute> {
  return {
    name: "babel-plugin-nativewind-size-matters",
    visitor: {
      Program: {
        exit(path, state) {
          const cwd = process.cwd();
          if (!state.filename) return;
          if (state.filename.startsWith(rootPath)) return;
          const relativeFilename = normalizePath(
            removeStartSep(relativePath(cwd, state.filename))
          );

          if (relativeFilename.includes(".cache")) {
            console.log(relativeFilename);
          }
          if (relativeFilename.includes("poll-update-client.js")) {
            path.traverse(visitorCss);
            return;
          }
        },
      },
    },
  };
}
