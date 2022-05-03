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

export type ArraySectionProps = {
  config: CustomArraySection;
  pathPrefix?: string;
};

export const ArraySection = ({ config, pathPrefix }: ArraySectionProps) => {
  const { label, name, fields } = config;
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

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
            {Object.values(fields)
              .filter((field) => field.showInFormPreview)
              .map((field) => (
                <TableCell>{field.label}</TableCell>
              ))}
          </TableHead>
          <TableBody>
            {containerValues?.map((data: any) => {
              const valuesToShow = Object.values(fields)
                .filter((field) => field.showInFormPreview)
                .map((field) => field.name);
              return (
                <TableRow>
                  {valuesToShow.map((name) => (
                    <TableCell>{data[name]}</TableCell>
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
                  <FormSection
                    config={{ ...config, type: "section", name: undefined }}
                  />
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
