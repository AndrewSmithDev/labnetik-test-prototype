import { View } from "@react-pdf/renderer";
import { Table, TableCell, TableRow } from "./table";

export const TableExample = () => {
  return (
    <View
      style={{
        padding: "32px",
        width: "100%",
      }}
    >
      <Table>
        <TableRow>
          <TableCell header colSpan={2}>
            Hello World
          </TableCell>
          <TableCell header>Hello World</TableCell>
          <TableCell header>Hello World</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Hello World</TableCell>
          <TableCell>Hello World</TableCell>
          <TableCell>Hello World</TableCell>
          <TableCell>Hello World</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Table nested>
              <TableRow>
                <TableCell>Hello World</TableCell>
                <TableCell>Hello World</TableCell>
                <TableCell>Hello World</TableCell>
                <TableCell>Hello World Hello World Hello World Hello World</TableCell>
              </TableRow>
            </Table>
          </TableCell>
          <TableCell>
            Hello World Hello World Hello World Hello World Hello World Hello World Hello World
            Hello World Hello World Hello
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Table nested>
              <TableRow>
                <TableCell>Hello World</TableCell>
                <TableCell>Hello World</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hello World</TableCell>
              </TableRow>
            </Table>
          </TableCell>
          <TableCell>
            Hello World Hello World Hello World Hello World Hello World Hello World Hello World
            Hello World Hello World Hello Hello World Hello World Hello World Hello World Hello
            World Hello World Hello World Hello World Hello World Hello
          </TableCell>
        </TableRow>
      </Table>
    </View>
  );
};
