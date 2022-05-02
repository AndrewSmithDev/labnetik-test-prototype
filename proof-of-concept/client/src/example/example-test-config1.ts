import { TestConfig } from "../type";

export const exampleConfig1: TestConfig = {
  title: "Example Test Configuration 1",
  stages: ["creation", "submission"],
  sections: {
    // arrayDemo: {
    //   type: "array-section",
    //   name: "arrayDemo",
    //   label: "Array Demo",
    //   fields: {
    //     number1: {
    //       type: "number",
    //       label: "Number 1 Input",
    //       name: "number1",
    //     },
    //     number2: {
    //       type: "number",
    //       label: "Number 2 Input",
    //       name: "number2",
    //     },
    //   },
    // },
    firstSection: {
      type: "section",
      name: "firstSection",
      label: "First Section",
      fields: {
        string1: {
          type: "string",
          label: "First String Input",
          name: "string1",
        },
        string2: {
          type: "string",
          label: "Second String Input",
          name: "string2",
        },
        string3: {
          type: "string",
          label: "Third String Input",
          name: "string3",
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
        },
        num: {
          type: "number",
          label: "Number Input",
          name: "number",
        },
        str: {
          type: "string",
          label: "String Input",
          name: "string",
        },
        strEnum: {
          type: "enum",
          options: { type: "string", values: ["a", "b", "c"] },
          label: "String Enum Input",
          name: "strEnum",
        },
        numEnum: {
          type: "enum",
          options: { type: "number", values: [10, 20, 30] },
          label: "Number Enum Input",
          name: "numEnum",
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
        },
        number2: {
          type: "number",
          label: "Number 2 Input",
          name: "number2",
        },
        computed: {
          type: "computed",
          label: "Average",
          name: "computed",
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
          equation: {
            expression: "x inch to cm",
            scope: {
              x: ["computedExample", "number1"],
            },
          },
        },
      },
    },
  },
};
