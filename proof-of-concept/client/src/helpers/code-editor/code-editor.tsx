import { DOMAttributes, useState } from "react";
import { z } from "zod";

export type ConfigEditorProps = {
  code: any;
  setCode: (config: any) => void;
  validationSchema?: z.ZodSchema;
};

export const CodeEditor = ({
  code: code,
  setCode: setCode,
  validationSchema,
}: ConfigEditorProps) => {
  const [error, setError] = useState("");

  const handleUpdate: DOMAttributes<HTMLTextAreaElement>["onBlur"] = (e) => {
    setError("");

    const newCode = JSON.parse(e.target.value);

    if (!validationSchema) {
      setCode(newCode);
    } else {
      const parseResult = validationSchema.safeParse(newCode);

      if (parseResult.success) {
        setCode(parseResult.data);
      } else {
        setError(JSON.stringify(parseResult.error, null, 2));
      }
    }
  };

  return (
    <div style={{ width: "50%" }}>
      {error && (
        <pre>
          <code style={{ color: "red" }}>{error}</code>
        </pre>
      )}
      <textarea style={{ width: "100%", height: "85vh" }} onBlur={handleUpdate}>
        {JSON.stringify(code, null, 2)}
      </textarea>
    </div>
  );
};
