import { CustomTestConfig } from "../type";

export const exampleConfig1: CustomTestConfig = {
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
        string1: {
          type: "string",
          label: "First Additional String Input",
          name: "string1",
        },
        string2: {
          type: "string",
          label: "Second Additional String Input",
          name: "string2",
        },
        string3: {
          type: "string",
          label: "Third Additional String Input",
          name: "string3",
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
