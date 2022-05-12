import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { TestConfig } from "../config-schema";
import { Section } from "./components/section";
import { TableExample } from "./components/table";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  root: {
    margin: "10px",
    fontFamily: "Helvetica",
    fontSize: "11pt",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument: any = Document;
const MyPage: any = Page;

export type PdfGeneratorProps = {
  config: TestConfig;
  data: any;
};

// Create Document Component
export const PdfGenerator = ({ data, config }: PdfGeneratorProps) => {
  // const sections = Object.entries(data).map(([key, value]) => (
  //   <Section key={key} label={key} value={value} />
  // ));
  // <View style={styles.root}>{sections}</View>

  return (
    <MyDocument>
      <MyPage size="A4" style={styles.page}>
        <TableExample />
      </MyPage>
    </MyDocument>
  );
};
