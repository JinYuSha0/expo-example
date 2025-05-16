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

const matchClassName = (
  className: string
):
  | {
      type: "s" | "vs" | "ms" | "mvs";
      factor: number | undefined;
    }
  | undefined => {
  const regex = /@(?<type>s|vs|ms|mvs)(?<factor>\d+(\.\d+)?)?/;
  const match = className.match(regex);
  if (match) {
    return {
      type: match.groups.type as "s" | "vs" | "ms" | "mvs",
      factor:
        match.groups.factor === undefined ? undefined : +match.groups.factor,
    };
  }
};

const matchMethod = {
  s: scale,
  vs: verticalScale,
  ms: moderateScale,
  mvs: moderateVerticalScale,
};

const getUniqueFieldName = (obj) => {
  const keys = Object.keys(obj);
  return keys.length === 1 ? keys[0] : null;
};

const propertyMap = {
  text: "fontSize",
  border: "borderWidth",
};
const propertyKeys = Object.keys(propertyMap);

export const __css = (parsed: NativeCssParsed) => {
  let startTime;
  if (__DEV__) {
    startTime = performance.now();
  }
  if (!parsed?.rules) return;
  for (const [className, style] of Object.entries(parsed.rules)) {
    try {
      const match = matchClassName(className);
      if (match.type) {
        const property = style.n[0].d[0][0];
        let fieldName = getUniqueFieldName(property);
        const fieldValue = property[fieldName];
        if (!fieldName) return;
        const prefix = className.match(/.*(?=-[^-]*$)/)[0];
        if (propertyKeys.includes(prefix)) {
          delete property[fieldName];
          fieldName = propertyMap[prefix];
        }
        property[fieldName] = matchMethod[match.type](fieldValue, match.factor);
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
