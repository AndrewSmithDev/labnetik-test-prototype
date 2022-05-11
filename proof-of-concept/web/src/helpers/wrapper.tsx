import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { exampleConfig2 } from "./example-config";
import { FormGenerator } from "../form";
import { exampleData1 } from "./example-data/example-data-1";
import { Tabs, Tab, Typography, Box, Button } from "@mui/material";
import { testConfigSchema } from "../config-schema";
import { PDFViewer } from "../pdf";
import { ExampleDocument } from "../pdf/example";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Wrapper = () => {
  const [config, setConfig] = useState(exampleConfig2);
  const [data, setData] = useState<any>(exampleData1);
  const [tab, setTab] = useState(1);
  const [showData, setShowData] = useState(false);

  const handleChange = (event: any, newTab: number) => {
    setTab(newTab);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Form" {...a11yProps(0)} />
        <Tab label="Report" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <div style={{ display: "flex", gap: 64, marginTop: 0 }}>
          <div style={{ width: 1, flexGrow: 1 }}>
            <CodeEditor code={config} setCode={setConfig} validationSchema={testConfigSchema} />
          </div>
          <div style={{ width: 1, flexGrow: 1 }}>
            <FormGenerator config={config} onSubmit={setData} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <div style={{ display: "flex", gap: 64, marginTop: 0 }}>
          <div style={{ flexGrow: 1, width: 1 }}>
            <Button onClick={() => setShowData(!showData)} fullWidth>
              Show {showData ? "Config" : "Data"}
            </Button>
            {showData ? (
              <CodeEditor code={data} setCode={setData} />
            ) : (
              <CodeEditor code={config} setCode={setConfig} validationSchema={testConfigSchema} />
            )}
          </div>
          <div style={{ flexGrow: 1, width: 1 }}>
            <PDFViewer title="Example Document">
              <ExampleDocument />
            </PDFViewer>
          </div>
        </div>
      </TabPanel>
    </>
  );
};
