import { View, Text } from "@react-pdf/renderer";

type TableCellProps = {
  colSpan?: number;
  children: React.ReactNode;
  style?: any;
  header?: boolean;
};

const getTextAlignment = (style: any) => {
  if (style.textAlign) return style.textAlign;
  if (style.alignItems === "flex-start") return "left";
  if (style.alignItems === "flex-end") return "right";
  if (style.alignItems === "center") return "center";
  return "left";
};

export const TableCell = ({ colSpan = 1, children, style = {}, header }: TableCellProps) => {
  return (
    <View
      style={{
        margin: 0,
        padding: 0,
        flexGrow: colSpan,
        flexBasis: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          border: `1px solid #333`,
          backgroundColor: "#fff",
          margin: "-1px",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          fontFamily: header ? "Helvetica-Bold" : "Helvetica",
          ...style,
        }}
      >
        {typeof children === "string" ? (
          <Text style={{ padding: 3, textAlign: getTextAlignment(style) }}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

type TableRowProps = { children: React.ReactNode };

export const TableRow = ({ children }: TableRowProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 0,
        flexGrow: 1,
      }}
    >
      {children}
    </View>
  );
};

type TableProps = { style?: any; children: React.ReactNode; nested?: boolean };

export const Table = ({ style, children, nested }: TableProps) => {
  return (
    <View
      style={{
        fontSize: "12pt",
        flexDirection: "column",
        width: "100%",
        flexShrink: 1,
        flexGrow: nested ? 1 : 0,
        ...style,
      }}
    >
      {children}
    </View>
  );
};
