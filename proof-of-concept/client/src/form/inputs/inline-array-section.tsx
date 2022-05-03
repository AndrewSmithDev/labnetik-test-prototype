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
    return <StringInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "number")
    return <NumberInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "boolean")
    return <BooleanInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "enum" && fieldConfig.options.type === "string")
    return <StringEnumInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "enum" && fieldConfig.options.type === "number")
    return <NumberEnumInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "computed")
    return <ComputedInput config={fieldConfig} pathPrefix={path} />;
  if (fieldConfig.type === "array")
    return <ArrayInput config={fieldConfig} pathPrefix={path} />;
};

export const InlineArraySection = ({
  config,
  pathPrefix,
}: InlineArraySectionProps) => {
  const { fields, name, label } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const { watch, setValue } = useFormContext();
  const values = watch(path) ?? [];

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleAdd = () => {
    setValue(path, [...values, {}]);
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
              <TableCell>{label}</TableCell>
            ))}
          </TableHead>
          <TableBody>
            {values?.map((data: any) => {
              console.log(data, fields);
              return (
                <TableRow>
                  {Object.values(fields).map((config) => (
                    <TableCell>{getInput(config, path)}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
