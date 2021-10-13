
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentPrintOrcamento from "./ComponentPrintOrcamento";

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button>Imprimir</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
        <ComponentPrintOrcamento ref={(el) => (componentRef = el)} />
        </div>
      </div>
    </>
  );
}