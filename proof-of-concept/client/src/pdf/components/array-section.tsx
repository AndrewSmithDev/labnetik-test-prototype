import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { formatUnknown } from "../formatters";
import { InlineArray } from "./inline-array";
import { TableRow, Table, TableCell } from "./table";

const styles = StyleSheet.create({
  header: {
    font: "helvetica-bold",
    fontSize: "16pt",
    marginBottom: "5pt",
  },
});

export const ArraySection = ({ label, values }: any) => {
  const headers = Object.keys(values[0]);
  const data = values.flatMap((row: any) => Object.entries(row));
  const sections = data.reduce((output: any, [key, value]: any) => {
    if (output[key]) {
      output[key].push(value);
    } else {
      output[key] = [value];
    }
    return output;
  }, {});

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.header}>{label}</Text>
      <Table>
        <TableRow>
          {headers.map((header: any) => (
            <TableCell header>{header}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          {Object.values(sections).map((section: any) => {
            return <InlineArray values={section} nested />;
          })}
        </TableRow>
      </Table>
    </View>
  );
};
