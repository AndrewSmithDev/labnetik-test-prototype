import { TextareaHTMLAttributes, useEffect, useState } from "react";
import { z } from "zod";

export type ConfigEditorProps = {
  code: any;
  setCode: (config: any) => void;
  validationSchema?: z.ZodSchema;
};

export const CodeEditor = ({
  code,
  setCode,
  validationSchema,
}: ConfigEditorProps) => {
  const [error, setError] = useState("");
  const [innerCode, setInnerCode] = useState(JSON.stringify(code, null, 2));

  useEffect(() => {
    setInnerCode(JSON.stringify(code, null, 2));
  }, [code]);

  const handleUpdate: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (e) => {
      setError("");

      setInnerCode(e.target.value);

      try {
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
      } catch (e: any) {
        setError(e.message);
      }
    };

  return (
    <>
      {error && (
        <pre>
          <code style={{ color: "red" }}>{error}</code>
        </pre>
      )}
      <textarea
        style={{ width: "100%", height: "85vh" }}
        onChange={handleUpdate}
        value={innerCode}
      />
    </>
  );
};
