import React from "react";
import ReactDOM from "react-dom/client";
import { exampleConfig1 } from "./example";
import { FormGenerator } from "./form";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FormGenerator testConfig={exampleConfig1} />
  </React.StrictMode>
);
