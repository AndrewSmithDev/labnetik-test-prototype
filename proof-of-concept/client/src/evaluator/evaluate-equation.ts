import * as math from "mathjs";
import { MathEquation } from "../config";
import * as R from "ramda";

export const evaluateEquation = (mathEquation: MathEquation, value: any) => {
  const scope = Object.entries(mathEquation.scope).reduce(
    (output, [key, path]) => {
      if (typeof path === "number") output[key] = path;
      else output[key] = parseFloat(R.view(R.lensPath(path), value));

      return output;
    },
    {} as Record<string, number | undefined>
  );

  if (Object.values(scope).includes(NaN)) return undefined;

  return math.evaluate(mathEquation.expression, scope).toString();
};
