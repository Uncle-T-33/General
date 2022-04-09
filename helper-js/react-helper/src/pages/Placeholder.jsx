import React from "react";
import "./Placeholder.css";
import Box from "../placeholder/Example/Box";
import Card from "../placeholder/Example/Card";

function Placeholder() {
  return (
    <div style={{ padding: "4rem" }}>
      <Box />
      <div style={{ height: "4rem", width: "100%", display: "block" }} />
      <Card />
    </div>
  );
}

export default Placeholder;
