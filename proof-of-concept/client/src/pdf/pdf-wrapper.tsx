import { PDFViewer } from "./viewer";
import { PdfGenerator } from "./pdf-generator";
import { TestConfig } from "../config-schema";

export type PdfWrapperProps = {
  config: TestConfig;
  data: any;
};

export const PdfWrapper = ({ config, data }: PdfWrapperProps) => {
  return (
    <PDFViewer title="Example Document">
      <PdfGenerator config={config} data={data} />
    </PDFViewer>
  );
};
