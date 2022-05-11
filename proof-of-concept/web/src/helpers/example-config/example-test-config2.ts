import { TestConfig } from "../../config-schema";

export const exampleConfig2: TestConfig = {
  title: "Example Test Configuration 2",
  stages: ["creation", "submission"],
  sections: [
    {
      type: "array-section",
      name: "arraySectionDemo",
      label: "Array Section Demo",
      showInFormPreview: [
        ["firstSection", "number1"],
        ["firstSection", "number2"],
        ["secondSection", "string1"],
        ["secondSection", "string2"],
      ],
      sections: [
        {
          type: "section",
          name: "firstSection",
          label: "First Section",
          fields: [
            {
              type: "number",
              label: "First Number Input",
              name: "number1",
              tooltip: "Example Tooltip",
              validation: { required: {}, gt: { value: 3 } },
            },
            {
              type: "number",
              label: "Second Number Input",
              name: "number2",
              tooltip: "Tooltip for Second Number Input",
            },
            {
              type: "number",
              label: "Third Number Input",
              name: "number3",
              tooltip: "Tooltip for Third Number Input",
            },
          ],
        },
        {
          type: "section",
          name: "secondSection",
          label: "Second Section",
          fields: [
            {
              type: "string",
              label: "First String Input",
              name: "string1",
              tooltip: "Example Tooltip",
            },
            {
              type: "string",
              label: "Second String Input",
              name: "string2",
              tooltip: "Tooltip for Second String Input",
            },
            {
              type: "string",
              label: "Third String Input",
              name: "string3",
              tooltip: "Tooltip for Third String Input",
            },
          ],
        },
      ],
    },
    {
      type: "inline-array-section",
      name: "inlineArray",
      label: "Inline Array",
      validation: { min: { value: 3 } },
      fields: [
        {
          type: "boolean",
          label: "Boolean Input",
          name: "boolean",
          tooltip: "Tooltip for Boolean Input",
        },
        {
          type: "date",
          label: "Date Input",
          name: "date",
          tooltip: "Tooltip for Date Input",
          validation: { required: {} },
        },
        {
          type: "string",
          label: "String Input",
          name: "string",
          tooltip: "Tooltip for String Input",
          validation: { required: {}, min: { value: 3 } },
        },
        {
          type: "enum",
          options: { type: "string", values: ["a", "b", "c"] },
          label: "String Enum Input",
          name: "strEnum",
          tooltip: "Tooltip for String Enum Input",
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
      name: "arrayDemo",
      label: "Array Demos",
      fields: [
        {
          type: "array",
          label: "String Array Input",
          name: "arrayString",
          tooltip: "Tooltip for String Array Input",
          validation: { min: { value: 3 } },
          config: {
            type: "string",
            label: "Number Input",
            name: "str",
            validation: { min: { value: 3 }, required: {} },
          },
        },
      ],
    },
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
            required: {},
          },
        },
        {
          type: "date",
          label: "Date Input",
          name: "date",
          tooltip: "Tooltip for Date Input",
          validation: { required: {} },
        },
        {
          type: "date-time",
          label: "Date Time Input",
          name: "dateTime",
          tooltip: "Tooltip for Date Time Input",
          validation: { required: {} },
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
          validation: { required: {} },
        },
      ],
    },
  ],
};
