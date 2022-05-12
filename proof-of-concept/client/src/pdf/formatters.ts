import { format } from "date-fns";

export const formatUnknown = (value?: unknown): string => {
  if (typeof value === "string") {
    const JsonDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (!!value.match(JsonDateRegex)) return formatDate(new Date(value));
    return formatString(value);
  }
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "boolean") return formatBoolean(value);
  if (Array.isArray(value)) return formatArray(value);
  if (value instanceof Date) return formatDate(value);

  console.log(`Unknown value type: ${typeof value}. Value: ${value}`);

  return `Error: ${JSON.stringify(value, null, 2)}`;
};

export const formatString = (value?: string): string => value ?? "";

export const formatNumber = (value?: number): string => {
  if (value === undefined || isNaN(value)) return "";
  return String(value);
};

export const formatBoolean = (value?: boolean): string => (value ? "Yes" : "No");

export const formatDate = (value?: Date): string =>
  value === undefined ? "" : format(value, "yyyy-MM-dd hh:mm aa");

export const formatArray = (values?: unknown[]): string => {
  if (!values) return "";
  const commaSeperatedString = values.reduce<string>(
    (output, current) => output + formatUnknown(current) + ", ",
    ""
  );
  // remove last common
  return commaSeperatedString.slice(0, -2);
};
