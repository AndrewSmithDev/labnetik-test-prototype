import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomArrayConfig } from "../../config-schema";
import { BaseInputProps } from "./base-input";
import { DateInput } from "./date-input";
import { DateTimeInput } from "./date-time-input";
import { NumberEnumInput } from "./number-enum-input";
import { NumberInput } from "./number-input";
import { StringEnumInput } from "./string-enum-input";
import { StringInput } from "./string-input";
import * as R from "ramda";

export type ArrayInputProps = BaseInputProps & {
  config: CustomArrayConfig;
};

const getInput = (
  config: CustomArrayConfig["config"]
): ((props: any) => JSX.Element) | null => {
  if (config.type === "string") return StringInput;
  if (config.type === "number") return NumberInput;
  if (config.type === "enum" && config.options.type === "string")
    return StringEnumInput;
  if (config.type === "enum" && config.options.type === "number")
    return NumberEnumInput;
  if (config.type === "date") return DateInput;
  if (config.type === "date-time") return DateTimeInput;
  return null;
};

export const ArrayInput = ({
  config,
  pathPrefix,
  showLabel = true,
  variant,
}: ArrayInputProps) => {
  const { register, trigger, watch, setValue, formState } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;
  const values = watch(path) ?? [undefined];

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const handleAdd = () => {
    setValue(path, [...values, undefined]);
    trigger(path);
  };

  const handleDelete = (index: number) => {
    setValue(
      path,
      values.filter((_: unknown, i: number) => i !== index)
    );
    trigger(path);
  };

  const Input = getInput(config.config);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Typography
          sx={{
            lineHeight: "30px",
            color: error?.message ? "#d32f2f" : "inherit",
          }}
        >
          {label}
        </Typography>
        <FormHelperText
          error={!!error}
          sx={{
            marginLeft: "16px",
            marginTop: 0,
            flexGrow: 1,
            lineHeight: "30px",
          }}
        >
          {error?.message}
        </FormHelperText>
        <Button onClick={handleAdd} size="small">
          ➕
        </Button>
      </div>

      {values.map((_: unknown, index: number) => {
        const valuePath = `${path}.${index}`;
        return (
          <div style={{ display: "flex" }}>
            {Input && (
              <Input
                pathPrefix={valuePath}
                config={config.config as any}
                showLabel={false}
                variant={variant}
              />
            )}
            <Button onClick={() => handleDelete(index)}>❌</Button>
          </div>
        );
      })}
    </>
  );
};
