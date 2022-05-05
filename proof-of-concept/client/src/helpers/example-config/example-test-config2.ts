import { TestConfig } from "../../config";

export const exampleConfig2: TestConfig = {
  title: "Example Test Configuration 2",
  stages: ["creation", "submission"],
  sections: [
    {
      type: "section",
      name: "additionalSections",
      label: "Additional  Section",
      fields: [
        {
          type: "boolean",
          label: "Boolean Input",
          name: "boolean",
          tooltip: "Tooltip for Boolean Input",
        },
        {
          type: "number",
          label: "Number Input",
          name: "number",
          tooltip: "Tooltip for Number Input",
          validation: {
            gt: { value: 0, message: "Must be greater than 0" },
          },
        },
        {
          type: "date",
          label: "Date Input",
          name: "date",
          tooltip: "Tooltip for Date Input",
        },
        {
          type: "date-time",
          label: "Date Time Input",
          name: "dateTime",
          tooltip: "Tooltip for Date Time Input",
        },
        {
          type: "string",
          label: "String Input",
          name: "string",
          tooltip: "Tooltip for String Input",
          validation: {
            min: { value: 3 },
            max: { value: 10 },
            required: {},
          },
        },
        {
          type: "enum",
          options: { type: "string", values: ["a", "b", "c"] },
          label: "String Enum Input",
          name: "strEnum",
          tooltip: "Tooltip for String Enum Input",
          validation: { required: {} },
        },
        {
          type: "enum",
          options: { type: "number", values: [10, 20, 30] },
          label: "Number Enum Input",
          name: "numEnum",
          tooltip: "Tooltip for Number Enum Input",
        },
      ],
    },
    {
      type: "section",
      name: "computedExample",
      label: "Computed Fields Demo",
      fields: [
        {
          type: "number",
          label: "Number 1 Input",
          name: "number1",
          tooltip: "Tooltip for Number 1 Input",
        },
        {
          type: "number",
          label: "Number 2 Input",
          name: "number2",
          tooltip: "Tooltip for Number 2 Input",
        },
        {
          type: "computed",
          label: "Average",
          name: "computed",
          tooltip: "Tooltip for Average",
          equation: {
            expression: "(x + y) / 2",
            scope: {
              x: ["computedExample", "number1"],
              y: ["computedExample", "number2"],
            },
          },
        },
        {
          type: "computed",
          label: "Cosine of Number 1",
          name: "cos",
          tooltip: "Tooltip for Cosine of Number 1",
          equation: {
            expression: "cos(x)",
            scope: {
              x: ["computedExample", "number1"],
            },
          },
        },
        {
          type: "computed",
          label: "Number 1 as inches to cm",
          name: "computedExample",
          tooltip: "Tooltip for Number 1 as inches to cm",
          equation: {
            expression: "x inch to cm",
            scope: {
              x: ["computedExample", "number1"],
            },
          },
        },
      ],
    },
  ],
};
