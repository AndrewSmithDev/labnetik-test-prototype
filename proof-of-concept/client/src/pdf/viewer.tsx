import { usePDF } from "@react-pdf/renderer";
import React, { useEffect } from "react";

export type PDFViewerProps = {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactElement;
  innerRef?: React.ClassAttributes<HTMLEmbedElement>["ref"];
  showToolbar?: boolean;
};

export const PDFViewer = ({
  title,
  className,
  style,
  children,
  innerRef,
  showToolbar = true,
}: PDFViewerProps): JSX.Element => {
  const [instance, updateInstance] = usePDF({ document: children });

  useEffect(() => {
    updateInstance();
  }, [children]);

  if (instance.loading) return <div>"Loading..."</div>;

  return (
    <object aria-label="PDF Viewer">
      <embed
        id="pdfViewer"
        type="application/pdf"
        title={title}
        ref={innerRef}
        src={`${instance.url}#toolbar=${showToolbar ? 1 : 0}`}
        className={className}
        style={{
          height: "calc(100vh - 125px)",
          width: "100%",
          marginTop: "20px",
        }}
      />
    </object>
  );
};
