export type ObjectID = string;

export type BaseTest =
  | "compressive-strength"
  | "soil-moisture"
  | "gradation-soil"
  | "gradation-aggregate"
  | "proctor"
  | "hydrometer"
  | "super-pave"
  | "marshall";

export type LabTestConfig =
  | { baseTest: BaseTest; testConfig?: ObjectID }
  | { baseTest: "other"; completeBaseTest: ObjectID; testConfig?: ObjectID };

export type LabConfig = {
  tests: LabTestConfig[];
};
export type PathToField = string[];

export type CustomTestConfig = {
  title: string;
  stages: string[]; // i.e. creation, login, break, report, complete
  disabledStockFields?: PathToField[];
  sections: { [n in Name]: SectionConfig };
};

export type Name = string; // letters and _ only /^([a-zA-Z_]+)$/

export type SectionConfig = {
  name: Name;
  label: string;
  fields: { [n in Name]: CustomField };
  hideInReport?: boolean;
};

export type CustomField =
  | CustomStringField
  | CustomNumberField
  | CustomBooleanField
  | CustomStringEnumField
  | CustomNumberEnumField
  | CustomComputedField
  | CustomArray;

export type FieldTypes = string | number | boolean | Date | Array<unknown>;
export type BaseCustomField<T extends FieldTypes> = {
  label: string;
  name: Name;
  tooltip?: string;
  hidden?: Predicate;
  validation?: { predicate: Predicate; validation: Validation<FieldTypes> }[];
  hideInReport?: boolean;
};

export type CustomStringField = BaseCustomField<string> & { type: "string" };
export type CustomNumberField = BaseCustomField<number> & { type: "number" };
export type CustomBooleanField = BaseCustomField<boolean> & { type: "boolean" };

export type CustomStringEnumField = BaseCustomField<string> & {
  type: "enum";
  options: { type: "string"; values: string[] };
};
export type CustomNumberEnumField = BaseCustomField<number> & {
  type: "enum";
  options: { type: "number"; values: number[] };
};

export type CustomComputedField = BaseCustomField<number> & {
  type: "computed";
  equation: MathEquation;
};

export type CustomArray = BaseCustomField<Array<unknown>> & {
  type: "array";
  config: CustomStringField | CustomNumberField | CustomArraySection;
};

export type CustomArraySection = {
  label: string;
  name: Name;
  fields: {
    [n in Name]: CustomArraySectionField;
  };
};

export type CustomArraySectionField = (
  | CustomStringField
  | CustomNumberField
  | CustomStringField
  | CustomBooleanField
  | CustomStringEnumField
  | CustomNumberEnumField
  | CustomComputedField
) & {
  showInFormPreview: boolean; // show the field in the form table
};

export type KeyInExpression = string;

export type MathEquation = {
  expression: string;
  scope: { [key in KeyInExpression]: PathToField | number };
};

export type Literal = number | boolean | string | RegExp;

export type Predicate = {
  expression: string;
  scope: { [key in KeyInExpression]: PathToField | Literal };
};

export type Language = "en" | "fr";

export type Validation<T extends string | number | boolean | Date | Array<unknown>> = {
  message: { [l in Language]?: string };
  validation: T extends string
    ? StringValidationOptions
    : T extends number
    ? NumberValidationOptions
    : T extends Array<unknown>
    ? ArrayValidationOptions
    : BaseValidationOptions;
};

export type BaseValidationOptions = { optional: boolean } | { unique: boolean }; // unqiue to lab & test

export type StringValidationOptions =
  | { min: number }
  | { max: number }
  | { length: number }
  | { email: boolean }
  | { url: boolean }
  | { regex: boolean }
  | { nonempty: boolean }
  | BaseValidationOptions;

export type NumberValidationOptions =
  | { gt: number }
  | { gte: number }
  | { lt: number }
  | { lte: number }
  | { int: boolean }
  | { positive: boolean } // > 0
  | { nonnegative: boolean } // >= 0
  | { negative: boolean } // < 0
  | { nonpositive: boolean } // <= 0
  | { multipleOf: number }
  | BaseValidationOptions;

export type ArrayValidationOptions =
  | { nonempty: boolean }
  | { min: boolean }
  | { max: boolean }
  | { length: number }
  | BaseValidationOptions;

// in the future we can add additional validation using refine or superrefine
