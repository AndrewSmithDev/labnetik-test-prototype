These are notes written by Andrew for himself, so that he doesn't forget them

# Overview 

### Lab Config

A lab configuration will be used to determine what test a lab has and what testConfigs they're using

```typescript
type BaseTest =
  | "compressive-strength"
  | "soil-moisture"
  | "gradation-soil"
  | "gradation-aggregate"
  | "proctor"
  | "hydrometer"
  | "super-pave"
  | "marshall"

type TestConfig = 
  | { baseTest: BaseTest, testConfig?: ObjectID }
  | { baseTest: "none", testConfig?: ObjectID };

type LabConfig = {
  tests: TestConfig[]
}
```


## Complete Base Test

WIP

## Custom Field Types
- string / text
- enum (elector)
- booleans (checkbox)
- numbers
- computed
  - use [mathjs parsing](https://mathjs.org/docs/expressions/parsing.html)
- sections
  - Objects with nested fields
  - with custom sections/titles
- arrays
  - of primitives (strings, enum, numbers)
    - display as a list of inputs
  - of sections/objects
    - displayed in a table
      - for sections that contain only a few fields display inline
      - for sections with a lot of fields use a modal to input values
        - use a table to show the values (allow a way to display/hide fields)
- dates
- units (length, weight, etc)
- selectors (projects, contractors, etc)

## Field Validation
- Phase 0
  - everything is optional
- Phase 1
  - required based on stage
    - required on and following stages
- Phase 2
  - basic zod validation
    - i.e. options on, `z.string()` or, `z.number()`
    - no `refine`s or `superRefine`
- phase 3
  - hide properties based on stage
    - i.e. dont show in creation but show in login
- phase 4
  - unique constraint
- phase 5
  - conditional validation
    - based on predicate determine if a validation should be used
      - predicate operators `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`, `&&`, `||`, `()`
      - comparison between fields (including computed fields) or literals
      - a ancestor fields cannot access decendent fields if the decendent field is nested in an array
        - i cant think of a good way to resolve indexing
    - will require a custom parser similiar to [math js's parser](https://mathjs.org/docs/expressions/parsing.html)
      - see example below
- phase 6
  - conditionally hide fields
    - use the same predicate method described in the section above

# Approach

## Top Level Configurations

```typescript
type PathToField = string[];

type CustomTestConfig = {
  title: string;
  stages: string[]; // i.e. creation, login, break, report, complete
  disabledStockFields: PathToField[];
  sections: { [n in Name]: Section };
}

type Name = string; // letters and _ only /^([a-zA-Z_]+)$/

type Section = {
  name: Name;
  label: string;
  fields: { [n in Name]: CustomField };
  hideInReport?: Predicate;
  hidden?: Predicate; 
}
```

## Custom Field properties

```typescript
type CustomField = 
  | CustomLiteralField 
  | CustomEnumField 
  | CustomComputedField 
  | CustomArray;

type BaseCustomField = {
  label: string;
  name: Name;
  tooltip?: string;
  hidden?: Predicate; 
  validation?: { Predicate, Validation }[];
  hideInReport?: Predicate;
}

type CustomLiteralField = BaseCustomField & {
  type: "string" | "number" | "boolean";
}

type CustomEnumField = BaseCustomField & {
  type: "enum";
  options: 
    | { type: "string", values: string[] }
    | { type: "number", values: number[] };
}

type CustomComputedField = BaseCustomField & {
  type: "computed";
  equation: MathEquation;
}

type CustomArray = BaseCustomField & {
  type: "array";
  config: CustomArrayLiteral | CustomArraySection;
}

type CustomArrayLiteral = BaseCustomField & {
  type: "string" | "number";
}

type CustomArraySection = {
  label: string;
  name: Name;
  fields: { 
    [n in Name]: CustomArraySectionField;
  }
}

type CustomArraySectionField = (
  | CustomLiteralField
  | CustomEnumField
  | CustomComputedField
) & { 
  showInFormPreview: boolean; // show the field in the form table
};

```

## Math Equations

```typescript
type KeyInExpression = string;

type MathEquation = {
  expression: string;
  scope: { [key in KeyInExpression]: PathToField | number }
}

// example
const expression = "x + y"
const scope = { x: ["path", "to", "field"], y: 6 }
const value = { path: { to: { field: 1 } } };

const result = parser(expression, scope, value); // 7
```

Note: we could show the equation in the disabled input's tooltip by inserting the label (for a field) and the value (for a literal) into the expression. **low priority**

```typescript
const expression = "x + y";
const schema = { 
  ...customTestConfig,
  section1: { 
    length: { 
      type: "number",
      label: "Length 1" ,
      ...remainingCustomFieldProps,
    },
    length: { 
      type: "number",
      label: "Length 2" ,
      ...remainingCustomFieldProps,
    },
    length: {
      type: "computed",
      toolTip: "The calculated average length",
      equation: {
        expression: "(x + y) / 2",
        scope: {
          x: ["section1", "length1"],
          y: ["section1", "length2"],
        },
      ...remainingCustomFieldProps,
      };
    }
  },
};

parser(expression, schema); 
// The calculated average length
// 
// Value = (`Length 1` + `Length 2`) / 2
```


## Predicates

predicate operators `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`, `&&`, `||`, `()`

```typescript
type KeyInExpression = string;
type Literal = number | boolean | string | RegExp;

type Predicate = {
  expression: string;
  scope: { [key in KeyInExpression]: PathToField | Literal };
};

// example
const expression = `x < y`;
const scope = { x: ["path", "to", "field"], y: 6 };
const value = { path: { to: { field: 1 } } };

const result = parser(expression, scope, value); // true
```

## Validation

```typescript
type Language = "en" | "fr";

type Validation<T extends string | number | boolean | Date | Array<unknown>> = {
  message: { [l in Language]?: string };
  validation: T extends string ? StringValidationOptions
    : T extends number ? NumberValidationOptions
    : T extends Array<unknown> ? ArrayValidationOptions
    : BaseValidationOptions;
};

type BaseValidationOptions = 
  | { optional: boolean }
  | { unique: boolean }; // unqiue to lab & test

type StringValidationOptions =
  | { min: number }
  | { max: number }
  | { length: number }
  | { email: boolean }
  | { url: boolean }
  | { regex: boolean }
  | { nonempty: boolean }
  | BaseValidationOptions;

type NumberValidationOptions =
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

type ArrayValidationOptions =
  | { nonempty: boolean }
  | { min: boolean }
  | { max: boolean }
  | { length: number }
  | BaseValidationOptions;

// in the future we can add additional validation using refine or superrefine
```

# Questions

- how can we allow for "support entities" like sieve stacks to custom tests
  - for now they can be added to the base complete test
