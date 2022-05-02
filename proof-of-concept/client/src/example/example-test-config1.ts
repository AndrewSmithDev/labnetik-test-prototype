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
