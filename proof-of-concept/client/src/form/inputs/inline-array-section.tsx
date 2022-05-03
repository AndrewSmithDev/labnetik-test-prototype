import {
  Button,
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
import { CustomInlineArraySectionConfig } from "../../type";
import { ArrayInput } from "./array-input";
import { BooleanInput } from "./boolean-input";
import { ComputedInput } from "./computed-input";
import { NumberEnumInput } from "./number-enum-input";
import { NumberInput } from "./number-input";
import { StringEnumInput } from "./string-enum-input";
import { StringInput } from "./string-input";

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
};

export const InlineArraySection = ({
  config,
  pathPrefix,
}: InlineArraySectionProps) => {
  const { fields, name, label } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const { watch, setValue } = useFormContext();
  const values = watch(path) ?? [{}];

  const handleAdd = () => {
    setValue(path, [...values, {}]);
  };

  const handleDelete = (index: number) => {
    setValue(
      path,
      values.filter((_: unknown, i: number) => i !== index)
    );
  };

  return (
    <section
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
        <Button onClick={handleAdd}>➕</Button>
      </div>
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
                    <Button onClick={() => handleDelete(index)}>➖</Button>
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
