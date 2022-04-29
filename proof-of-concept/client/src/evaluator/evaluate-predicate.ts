import { PathToField, Predicate } from "../type";
import { lensPath, view } from "ramda";

export const getValue = (path: PathToField, value: unknown) => {
  const lens = lensPath(path);
  return view(lens, value);
};

export const getScopeWithValues = (scope: Predicate["scope"], value: unknown) => {
  return Object.entries(scope).reduce<Record<string, unknown>>((output, [k, v]) => {
    if (!Array.isArray(v)) {
      output[k] = v;
      return output;
    }

    output[k] = getValue(v, value);
    return output;
  }, {});
};

export const replaceKey = (expression: string, [key, value]: [string, unknown]) => {
  return expression.replaceAll(key, String(value));
};

export const insertValuesIntoExpress = (expression: string, scope: { [key in string]: any }) => {
  return Object.entries(scope).reduce(replaceKey, expression);
};

export const evaluatePredicate = (predicate: Predicate, value: any) => {
  const scopeWithValues = getScopeWithValues(predicate.scope, value);

  const expression = Object.entries(scopeWithValues).reduce((output, [k, v]) => {
    return output.replaceAll(k, String(v));
  }, predicate.expression);

  return eval(expression);
};
