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

export type InlineArraySectionProps = {
  config: CustomInlineArraySectionConfig;
  pathPrefix?: string;
};

export const InlineArraySection = ({
  config,
  pathPrefix,
}: InlineArraySectionProps) => {
  const { fields, name, label } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const { watch } = useFormContext();
  const values = watch(path);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <section
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        marginBottom: 16,
      }}
    >
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            {Object.values(fields).map(({ label }) => (
              <TableCell>{label}</TableCell>
            ))}
          </TableHead>
          <TableBody>
            {values?.map((data: any) => {
              console.log(data);
              return (
                <TableRow>
                  <TableCell>{data}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
