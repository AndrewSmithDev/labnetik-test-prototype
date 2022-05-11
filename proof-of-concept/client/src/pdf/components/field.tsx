import { Text, StyleSheet } from "@react-pdf/renderer";
import { BoldText } from "./bold-text";

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: "5pt",
  },
});

export type FieldApps = { label: string; value: string };

export const Field = ({ label, value }: FieldApps) => {
  return (
    <Text style={styles.marginBottom}>
      <BoldText>{label + ": "}</BoldText>
      {value}
    </Text>
  );
};
