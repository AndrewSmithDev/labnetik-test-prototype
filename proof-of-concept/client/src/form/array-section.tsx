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
} from "@mui/material";
import { useState, DOMAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CustomArraySection } from "../type";
import { FormSection } from "./form-section";
import * as R from "ramda";
import { InlineArraySection } from "./inputs";

export type ArraySectionProps = {
  config: CustomArraySection;
  pathPrefix?: string;
};

export const ArraySection = ({ config, pathPrefix }: ArraySectionProps) => {
  const { label, name, sections, showInFormPreview } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const fields = Object.values(sections).flatMap((sections) =>
    Object.values(sections.fields)
  );

  const containerForm = useFormContext();
  const containerValues = containerForm.watch(path);

  const [open, setOpen] = useState(false);

  const innerForm = useForm();

  useEffect(() => {
    console.log(containerValues);
  }, [containerValues]);

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (event) => {
    event.preventDefault();
    event.stopPropagation();

    innerForm.handleSubmit((data) => {
      const index = containerValues?.length ?? 0;
      containerForm.setValue(`${path}.${index}`, data);
      setOpen(false);
      innerForm.reset();
    })(event);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Button onClick={() => setOpen(true)}>➕</Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            {showInFormPreview.map(([section, field]) => {
              return (
                <TableCell>
                  {config.sections[section]?.fields[field]?.label}
                </TableCell>
              );
            })}
          </TableHead>
          <TableBody>
            {containerValues?.map((data: any) => {
              return (
                <TableRow>
                  {showInFormPreview?.map((path) => (
                    <TableCell>{R.view(R.lensPath(path), data)}</TableCell>
                  ))}
                </TableRow>
              );
            })}
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
                      return <InlineArraySection config={section} />;
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
