import * as math from "mathjs";
import { MathEquation } from "../type";
import * as R from "ramda";

export const evaluateEquation = (mathEquation: MathEquation, value: any) => {
  const scope = Object.entries(mathEquation.variables).reduce(
    (output, [key, path]) => {
      if (typeof path === "number") output[key] = path;
      else output[key] = parseFloat(R.view(R.lensPath(path), value));

      return output;
    },
    {} as Record<string, number | undefined>
  );

  console.log(scope);

  if (Object.values(scope).includes(NaN)) return undefined;

  return math.evaluate(mathEquation.expression, scope);
};
