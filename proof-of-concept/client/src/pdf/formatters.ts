export const formatUnknown = (value?: unknown): string => {
  if (typeof value === "string") return formatString(value);
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "boolean") return formatBoolean(value);
  if (Array.isArray(value)) return formatArray(value);
  console.log(`Unknown value type: ${typeof value}. Value: ${value}`);
  return JSON.stringify(value, null, 2);
};

export const formatString = (value?: string): string => value ?? "";

export const formatNumber = (value?: number): string => {
  if (value === undefined || isNaN(value)) return "";
  return String(value);
};

export const formatBoolean = (value?: boolean): string => (value ? "Yes" : "No");

export const formatDate = (value?: Date): string => value?.toDateString() ?? "";

export const formatArray = (values?: unknown[]): string => {
  if (!values) return "";
  const commaSeperatedString = values.reduce<string>(
    (output, current) => output + formatUnknown(current) + ", ",
    ""
  );
  // remove last common
  return commaSeperatedString.slice(0, -2);
};
