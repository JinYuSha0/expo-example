import { clone, isNil } from "es-toolkit";
import { useUnstableNativeVariable } from "nativewind";
import React from "react";
import { Text, TextInput } from "react-native";

export const hslaToString = (
  hsla: (string | number)[] | undefined,
  opacity?: number
): string | undefined => {
  if (Array.isArray(hsla) && [3, 4].includes(hsla.length)) {
    if (!isNil(opacity)) hsla[3] = opacity;
    if (hsla.length === 3) {
      return `hsl(${hsla.join(", ")})`;
    }
    return `hsla(${hsla.join(", ")})`;
  }
};

export const useCssColorVariable = (
  name: string,
  opacity?: number
): string | undefined => {
  return hslaToString(clone(useUnstableNativeVariable(name)), opacity);
};

type OverrideComponent = {
  render: () => React.ReactElement<any>;
};

export const normalize = () => {
  const RNText = Text as unknown as OverrideComponent;
  const originalTextRender = RNText.render;
  RNText.render = function (...args) {
    const origin = originalTextRender.call(this, ...args);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const defaultColor = useCssColorVariable("--foreground");
    return React.cloneElement(origin, {
      ...origin.props,
      style: [{ color: defaultColor }, origin.props.style],
    });
  };

  const RNTextInput = TextInput as unknown as OverrideComponent;
  const originalTextInputRender = RNTextInput.render;
  RNTextInput.render = function (...args) {
    const origin = originalTextInputRender.call(this, ...args);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const defaultColor = useCssColorVariable("--foreground");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const defaultPlaceholderColor = useCssColorVariable("--foreground", 0.5);
    return React.cloneElement(origin, {
      ...origin.props,
      placeholderTextColor:
        origin.props.placeholderTextColor ?? defaultPlaceholderColor,
      style: [{ color: defaultColor }, origin.props.style],
    });
  };
};
