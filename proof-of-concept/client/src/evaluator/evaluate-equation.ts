import math from "mathjs";
import { MathEquation } from "../type";
import * as R from "ramda";

export const evaluateEquation = (mathEquation: MathEquation, value: any) => {
  const v = Object.entries(mathEquation.scope).reduce((output, [key, path]) => {
    output[key] = R.view(R.lensPath(path), value);
    return output;
  }, {} as Record<string, number>);

  return math.evaluate(mathEquation.expression, v);
};
