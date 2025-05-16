const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { transformerPath } = require("nativewind-size-matters/transformer");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  { ...config, transformerPath },
  { input: "./global.css" }
);
