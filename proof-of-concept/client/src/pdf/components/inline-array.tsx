import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { formatUnknown } from "../formatters";
import { TableRow, Table, TableCell } from "./table";

const styles = StyleSheet.create({
  header: {
    font: "helvetica-bold",
    fontSize: "16pt",
    marginBottom: "5pt",
  },
});

export const InlineArray = ({ label, values, nested }: any) => {
  const headers = Object.keys(values[0]);
  const rows = values.map((row: any) => Object.values(row).map((cell: any) => formatUnknown(cell)));

  const table = (
    <Table nested={!!nested}>
      <TableRow>
        {headers.map((header: any) => (
          <TableCell header>{header}</TableCell>
        ))}
      </TableRow>
      {rows.map((row: any) => (
        <TableRow>
          {row.map((cell: any) => (
            <TableCell>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );

  if (nested) return table;

  return (
    <View style={{ marginBottom: "8px" }}>
      <Text style={styles.header}>{label}</Text>
      {table}
    </View>
  );
};
