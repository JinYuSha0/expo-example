import {
  getUIScaleSize,
  initialUIScaleSize,
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "./core";

let debugFlag = false;
const setDebug = (flag: boolean) => {
  debugFlag = true;
};
const debug = (...args: any) => {
  if (debugFlag) {
    console.log.apply(null, args);
  }
};

type NativeCssParsed = {
  rules: Record<
    string,
    {
      n: { d: [[Record<string, number>]] }[];
    }
  >;
};

const matchClassName = (className: string) => {
  const regex = /(\w+(?:-\w+)*)-\[(\d+(?:\.\d+)?)px\]/;
  const match = className.match(regex);
  if (match) {
    const [fullMatch, prefix, value] = match;
    return {
      fullMatch,
      prefix,
      value: parseFloat(value),
    };
  }
};

const getUniqueFieldName = (obj) => {
  const keys = Object.keys(obj);
  return keys.length === 1 ? keys[0] : null;
};

export const __css = (parsed: NativeCssParsed) => {
  let startTime;
  if (__DEV__) {
    startTime = performance.now();
  }
  if (!parsed?.rules) return;
  for (const [className, style] of Object.entries(parsed.rules)) {
    try {
      const match = matchClassName(className);
      if (match) {
        const property = style.n[0].d[0][0];
        let fieldName = getUniqueFieldName(property);
        if (!fieldName) return;
        property[fieldName] = scale(match.value);
        debug(className, property);
      }
    } catch {}
  }
  if (__DEV__) {
    const endTime = performance.now();
    const UIScaleSize = getUIScaleSize();
    console.log(
      `nativewind-size-matters {width: ${UIScaleSize.width}, height: ${
        UIScaleSize.height
      }} conversion takes ${(endTime - startTime).toFixed(2)}ms`
    );
  }
  return parsed;
};

export default {
  __css,
  initialUIScaleSize,
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
};

export {
  initialUIScaleSize,
  moderateScale,
  moderateVerticalScale,
  scale,
  setDebug,
  verticalScale,
};
