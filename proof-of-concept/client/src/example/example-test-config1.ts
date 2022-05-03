import { TestConfig } from "../type";

export const exampleConfig1: TestConfig = {
  title: "Example Test Configuration 1",
  stages: ["creation", "submission"],
  sections: {
    firstSection: {
      type: "section",
      name: "firstSection",
      label: "First Section",
      fields: {
        string1: {
          type: "string",
          label: "First String Input",
          name: "string1",
          tooltip: "Example Tooltip",
        },
        string2: {
          type: "string",
          label: "Second String Input",
          name: "string2",
          tooltip: "Tooltip for Second String Input",
        },
        string3: {
          type: "string",
          label: "Third String Input",
          name: "string3",
          tooltip: "Tooltip for Third String Input",
        },
      },
    },
    additionalSections: {
      type: "section",
      name: "additionalSections",
      label: "Additional  Section",
      fields: {
        bool: {
          type: "boolean",
          label: "Boolean Input",
          name: "boolean",
          tooltip: "Tooltip for Boolean Input",
        },
        num: {
          type: "number",
          label: "Number Input",
          name: "number",
          tooltip: "Tooltip for Number Input",
        },
        date: {
          type: "date",
          label: "Date Input",
          name: "date",
          tooltip: "Tooltip for Date Input",
        },
        dateTime: {
          type: "date-time",
          label: "Date Time Input",
          name: "date-time",
          tooltip: "Tooltip for Date Time Input",
        },
        time: {
          type: "time",
          label: "Time Input",
          name: "time",
          tooltip: "Tooltip for Time Input",
        },
        str: {
          type: "string",
          label: "String Input",
          name: "string",
          tooltip: "Tooltip for String Input",
        },
        strEnum: {
          type: "enum",
          options: { type: "string", values: ["a", "b", "c"] },
          label: "String Enum Input",
          name: "strEnum",
          tooltip: "Tooltip for String Enum Input",
        },
        numEnum: {
          type: "enum",
          options: { type: "number", values: [10, 20, 30] },
          label: "Number Enum Input",
          name: "numEnum",
          tooltip: "Tooltip for Number Enum Input",
        },
      },
    },
    computedExample: {
      type: "section",
      name: "computedExample",
      label: "Computed Fields Demo",
      fields: {
        number1: {
          type: "number",
          label: "Number 1 Input",
          name: "number1",
          tooltip: "Tooltip for Number 1 Input",
        },
        number2: {
          type: "number",
          label: "Number 2 Input",
          name: "number2",
          tooltip: "Tooltip for Number 2 Input",
        },
        computed: {
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
        cos: {
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
        computedExample: {
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
      },
    },
    arrayDemo: {
      type: "section",
      name: "firstSection",
      label: "Array Demos",
      fields: {
        str: {
          type: "array",
          label: "String Array Input",
          name: "str",
          tooltip: "Tooltip for String Array Input",
          config: {
            type: "string",
            label: "Number Input",
            name: "str",
          },
        },
        strEnum: {
          type: "array",
          label: "String Enum Array Input",
          name: "strEnum",
          tooltip: "Tooltip for String Enum Array Input",
          config: {
            type: "enum",
            options: { type: "string", values: ["a", "b", "c"] },
            label: "String Enum Input",
            name: "strEnum",
          },
        },
      },
    },
    inlineArray: {
      type: "inline-array-section",
      name: "inlineArray",
      label: "Inline Array",
      fields: {
        bool: {
          type: "boolean",
          label: "Boolean Input",
          name: "boolean",
          tooltip: "Tooltip for Boolean Input",
        },
        date: {
          type: "date",
          label: "Date Input",
          name: "date",
          tooltip: "Tooltip for Date Input",
        },
        str: {
          type: "string",
          label: "String Input",
          name: "string",
          tooltip: "Tooltip for String Input",
        },
        strEnum: {
          type: "enum",
          options: { type: "string", values: ["a", "b", "c"] },
          label: "String Enum Input",
          name: "strEnum",
          tooltip: "Tooltip for String Enum Input",
        },
        numEnum: {
          type: "enum",
          options: { type: "number", values: [10, 20, 30] },
          label: "Number Enum Input",
          name: "numEnum",
          tooltip: "Tooltip for Number Enum Input",
        },
      },
    },
    arraySectionDemo: {
      type: "array-section",
      name: "arrayDemo",
      label: "Array Section Demo",
      showInFormPreview: [
        ["firstSection", "number1"],
        ["firstSection", "number2"],
        ["secondSection", "string1"],
        ["secondSection", "string2"],
      ],
      sections: {
        firstSection: {
          type: "section",
          name: "firstSection",
          label: "First Section",
          fields: {
            number1: {
              type: "number",
              label: "First Number Input",
              name: "number1",
              tooltip: "Example Tooltip",
            },
            number2: {
              type: "number",
              label: "Second Number Input",
              name: "number2",
              tooltip: "Tooltip for Second Number Input",
            },
            number3: {
              type: "number",
              label: "Third Number Input",
              name: "number3",
              tooltip: "Tooltip for Third Number Input",
            },
          },
        },
        secondSection: {
          type: "section",
          name: "secondSection",
          label: "Second Section",
          fields: {
            string1: {
              type: "string",
              label: "First String Input",
              name: "string1",
              tooltip: "Example Tooltip",
            },
            string2: {
              type: "string",
              label: "Second String Input",
              name: "string2",
              tooltip: "Tooltip for Second String Input",
            },
            string3: {
              type: "string",
              label: "Third String Input",
              name: "string3",
              tooltip: "Tooltip for Third String Input",
            },
          },
        },
      },
    },
  },
};
