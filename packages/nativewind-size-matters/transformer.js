const path = require("path");
const worker = require("metro-transform-worker");

exports.transformerPath = path.resolve(__filename);

exports.transform = async function transform(
  config,
  projectRoot,
  filename,
  data,
  options
) {
  const transform = worker.transform;
  if (
    path.dirname(filename) !== config.cssInterop_outputDirectory ||
    filename.endsWith(".css")
  ) {
    return transform(config, projectRoot, filename, data, options);
  }

  const newData = `import { __css } from "nativewind-size-matters/dist/index";import { injectData } from "react-native-css-interop/dist/runtime/native/styles";injectData(__css({}));`;

  return transform(
    config,
    projectRoot,
    filename,
    Buffer.from(newData),
    options
  );
};
