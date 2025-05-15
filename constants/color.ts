/* eslint-disable react-hooks/rules-of-hooks */
import { useCssColorVariable } from "@/utils/ui";

const color = {
  background: useCssColorVariable("--background")!,
  primary: useCssColorVariable("--primary")!,
  primaryDisabled: useCssColorVariable("--primary", 0.4)!,
  foreground: useCssColorVariable("--foreground")!,
};

export default color;
