import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useState, DOMAttributes, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CustomArraySection } from "../config-schema";
import { FormSection } from "./form-section";
import * as R from "ramda";
import { InlineArraySectionInput } from "./inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArraySectionSchema } from "../validation/array-section";
import { ZodOptional } from "zod";

export type ArraySectionProps = {
  config: CustomArraySection;
  pathPrefix?: string;
};

export const ArraySection = ({ config, pathPrefix }: ArraySectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<undefined | number>(
    undefined
  );
  const { label, name, sections, showInFormPreview } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const fields = useMemo(
    () =>
      Object.values(sections).flatMap((sections) =>
        Object.values(sections.fields)
      ),
    [sections]
  );

  const headers = useMemo(
    () =>
      showInFormPreview.map(([section, field]) => {
        return sections
          .find((s) => s.name === section)
          ?.fields.find((x) => x.name === field)?.label;
      }),
    [sections, fields, showInFormPreview]
  );

  const containerForm = useFormContext();
  const containerValues = containerForm.watch(path);
  const errors = R.view(
    R.lensPath(path.split(".")),
    containerForm.formState.errors
  );

  const [open, setOpen] = useState(false);

  const schema = createArraySectionSchema(config);
  const innerForm = useForm({
    resolver: zodResolver(
      schema instanceof ZodOptional ? schema.unwrap().element : schema.element
    ),
  });

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (event) => {
    event.preventDefault();
    event.stopPropagation();

    innerForm.handleSubmit((data) => {
      const index = selectedIndex ?? containerValues?.length ?? 0;
      containerForm.setValue(`${path}.${index}`, data);
      handleClose();
    })(event);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(undefined);
    innerForm.reset({});
  };

  const handleDelete = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();

    containerForm.setValue(
      path,
      containerValues.filter((_: unknown, i: number) => i !== index)
    );
  };

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    innerForm.reset({ ...containerValues[index] });
    setOpen(true);
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
        <Typography
          variant="h5"
          sx={{
            lineHeight: "30px",
            color: errors?.message ? "#d32f2f" : "inherit",
          }}
        >
          {label}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={() => setOpen(true)} size="small">
          ???
        </Button>
      </div>
      {errors?.message && (
        <FormHelperText error>{errors.message}</FormHelperText>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            {headers.map((h) => (
              <TableCell>{h}</TableCell>
            ))}
            <TableCell />
          </TableHead>
          <TableBody>
            {!containerValues || containerValues.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={showInFormPreview.length + 1}
                  align="center"
                >
                  No Entries
                </TableCell>
              </TableRow>
            ) : (
              containerValues.map((data: unknown, index: number) => {
                return (
                  <TableRow
                    onClick={() => handleEdit(index)}
                    hover
                    selected={index === selectedIndex}
                    sx={{ cursor: "pointer" }}
                  >
                    {showInFormPreview?.map((path) => (
                      <TableCell align="center">
                        {R.view(R.lensPath(path), data)}
                      </TableCell>
                    ))}
                    <TableCell onClick={(event) => handleDelete(event, index)}>
                      <Button>???</Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <div style={{ margin: 32 }}>
          <Paper>
            <div style={{ padding: 32 }}>
              <FormProvider {...innerForm}>
                <form onSubmit={handleSubmit}>
                  {Object.values(sections).map((section) => {
                    if (section.type === "inline-array-section")
                      return <InlineArraySectionInput config={section} />;
                    return <FormSection config={section} />;
                  })}
                  <Button onClick={handleClose} fullWidth>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ marginTop: 8 }}
                  >
                    Save
                  </Button>
                </form>
              </FormProvider>
            </div>
          </Paper>
        </div>
      </Modal>
    </section>
  );
};
