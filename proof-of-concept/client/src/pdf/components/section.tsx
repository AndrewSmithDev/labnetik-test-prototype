import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { formatUnknown } from "../formatters";
import { Field } from "./field";
import { InlineArray } from "./inline-array";

const styles = StyleSheet.create({
  header: {
    font: "helvetica-bold",
    fontSize: "16pt",
    marginBottom: "5pt",
  },
});

const Fields = ({ values }: any) => {
  const fields = Object.entries(values).map(([key, value]) => {
    return (
      <View key={key}>
        <Field label={key} value={formatUnknown(value)} />
      </View>
    );
  });
  return <>{fields}</>;
};

const hasNestedFields = (value: any) => {
  return Object.values(value).some(
    (x) => typeof x === "object" && x !== null && !(x instanceof Date)
  );
};

export const Section = ({ label, value }: any) => {
  let fields: any = JSON.stringify(value, null, 2);

  if (typeof value === "object" && !Array.isArray(value)) {
    fields = <Fields values={value} />;
  } else if (hasNestedFields(value[0])) {
    fields = value.map((values: any) =>
      Object.entries(values)?.map(([key, value]) => <Section key={key} label={key} value={value} />)
    );
  } else {
    fields = <InlineArray values={value} />;
  }

  return (
    <>
      <Text style={styles.header}>{label}</Text>
      <View>{fields}</View>
    </>
  );
};
