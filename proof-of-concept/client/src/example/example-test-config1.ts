import { TestConfig } from "../type";

export const exampleConfig1: TestConfig = {
  title: "Example Test Configuration 1",
  stages: ["creation", "submission"],
  sections: {
    firstSection: {
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
      name: "computedExample",
      label: "Computed field Demo",
      fields: {
        computedExample: {
          type: "computed",
          label: "10 + 5",
          name: "computedExample",
          equation: {
            expression: "x + y",
            variables: { x: 10, y: 5 },
          },
        },
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
            variables: {
              x: ["computedExample", "number1"],
              y: ["computedExample", "number2"],
            },
          },
        },
      },
    },
  },
};

export const exampleValue1 = {
  sections: {
    firstSection: {
      string1: "string 1",
      string2: "string 2",
    },
    additionalSection: {
      string1: "additional string 1",
    },
  },
};
