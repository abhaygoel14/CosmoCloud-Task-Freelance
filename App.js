import React from "react";
import ReactDOM from "react-dom/client";
import FormLayout from "./src/components/FormLayout";
import "./style.css";

const AppLayout = () => {
  return (
    <React.Fragment>
      <FormLayout />
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
