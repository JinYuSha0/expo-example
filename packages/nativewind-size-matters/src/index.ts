type NativeCssParsed = {
  rules: [
    string,
    {
      $$type: "StyleRuleSet";
      normal: {
        $$type: "StyleRule";
        specificity: {
          A: number;
          B: number;
          C: number;
          I: number;
          S: number;
          O: number;
        };
        declarations: [string, [string, string], string | number][];
      }[];
    }
  ][];
};

export function __css(parsed: NativeCssParsed) {
  console.log(parsed);
  return parsed;
}

export default {
  __css,
};
