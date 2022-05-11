import ReactPDF, { Text, StyleSheet } from "@react-pdf/renderer";

const defaultStyles = StyleSheet.create({
  boldText: {
    fontFamily: "Helvetica-Bold",
  },
});

export type BoldTextProps = {
  children: string;
  style?: ReactPDF.Styles;
};

export const BoldText = ({ children, style = {} }: BoldTextProps): JSX.Element => (
  <Text style={{ ...defaultStyles.boldText, ...style }}>{children}</Text>
);
