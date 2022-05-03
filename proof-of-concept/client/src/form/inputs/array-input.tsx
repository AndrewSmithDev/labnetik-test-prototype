import { Button, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CustomArrayConfig } from "../../type";
import { BaseInputProps } from "./base-input";
import { NumberEnumInput } from "./number-enum-input";
import { NumberInput } from "./number-input";
import { StringEnumInput } from "./string-enum-input";
import { StringInput } from "./string-input";

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
  return null;
};

export const ArrayInput = ({
  config,
  pathPrefix,
  showLabel,
  variant,
}: ArrayInputProps) => {
  const { register, watch, setValue } = useFormContext();
  const { label, name, tooltip, hidden, validation } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;
  const values = watch(path) ?? [undefined];

  const handleAdd = () => {
    setValue(path, [...values, undefined]);
  };

  const handleDelete = (index: number) => {
    setValue(
      path,
      values.filter((_: unknown, i: number) => i !== index)
    );
  };

  const Input = getInput(config.config);

  return (
    <>
      <div style={{ display: "flex" }}>
        {showLabel ? (
          <Typography sx={{ flexGrow: 1, lineHeight: "30px" }}>
            {label}
          </Typography>
        ) : (
          <div style={{ flexGrow: 1 }} />
        )}
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
