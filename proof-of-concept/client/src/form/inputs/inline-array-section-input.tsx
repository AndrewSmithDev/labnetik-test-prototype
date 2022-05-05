import {
  Button,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CustomInlineArraySectionConfig } from "../../config-schema";
import { ArrayInput } from "./array-input";
import { BooleanInput } from "./boolean-input";
import { ComputedInput } from "./computed-input";
import { DateInput } from "./date-input";
import { DateTimeInput } from "./date-time-input";
import { NumberEnumInput } from "./number-enum-input";
import { NumberInput } from "./number-input";
import { StringEnumInput } from "./string-enum-input";
import { StringInput } from "./string-input";
import * as R from "ramda";

export type InlineArraySectionProps = {
  config: CustomInlineArraySectionConfig;
  pathPrefix?: string;
};

const getInput = (fieldConfig: any, path: string) => {
  if (fieldConfig.type === "string")
    return (
      <StringInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "number")
    return (
      <NumberInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "boolean")
    return (
      <BooleanInput config={fieldConfig} pathPrefix={path} showLabel={false} />
    );
  if (fieldConfig.type === "enum" && fieldConfig.options.type === "string")
    return (
      <StringEnumInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "enum" && fieldConfig.options.type === "number")
    return (
      <NumberEnumInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "computed")
    return (
      <ComputedInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "array")
    return (
      <ArrayInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );

  if (fieldConfig.type === "date")
    return (
      <DateInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
  if (fieldConfig.type === "date-time")
    return (
      <DateTimeInput
        config={fieldConfig}
        pathPrefix={path}
        showLabel={false}
        variant="standard"
      />
    );
};

export const InlineArraySectionInput = ({
  config,
  pathPrefix,
}: InlineArraySectionProps) => {
  const { fields, name, label } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const { trigger, watch, setValue, formState } = useFormContext();
  const values = watch(path) ?? [{}];

  const error = R.view(R.lensPath(path.split(".")), formState.errors);

  const handleAdd = () => {
    setValue(path, [...values, {}]);
    trigger(path);
  };

  const handleDelete = (index: number) => {
    setValue(
      path,
      values.filter((_: unknown, i: number) => i !== index)
    );
    trigger(path);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography
          variant="h5"
          sx={{ color: error?.message ? "#d32f2f" : "inherit" }}
        >
          {label}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleAdd} size="small">
          ➕
        </Button>
      </div>
      {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
      <TableContainer>
        <Table>
          <TableHead>
            {Object.values(fields).map(({ label }) => (
              <TableCell align="center">{label}</TableCell>
            ))}
            <TableCell />
          </TableHead>
          <TableBody>
            {values?.map((_: unknown, index: number) => {
              return (
                <TableRow>
                  {Object.values(fields).map((config) => (
                    <TableCell align="center" sx={{ padding: "8px 4px" }}>
                      {getInput(config, path + "." + index)}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Button onClick={() => handleDelete(index)}>❌</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
