import { Button, Modal, Paper, Typography } from "@mui/material";
import { useState, DOMAttributes } from "react";
import { CustomArraySection } from "../type";
import { FormSection } from "./form-section";

export type ArraySectionProps = {
  config: CustomArraySection;
  pathPrefix?: string;
};

export const ArraySection = ({ config, pathPrefix }: ArraySectionProps) => {
  const { label, name, fields } = config;
  const [open, setOpen] = useState(false);
  const path = pathPrefix ? `${pathPrefix}.${name}` : name;

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(event);
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
      <Typography variant="h5">{label}</Typography>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ margin: 32 }}>
          <Paper>
            <div style={{ padding: 32 }}>
              <form onSubmit={handleSubmit}>
                <FormSection
                  config={{ ...config, type: "section" }}
                  pathPrefix={path}
                />
                <Button onClick={handleClose} fullWidth variant="outlined">
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
            </div>
          </Paper>
        </div>
      </Modal>
    </section>
  );
};
