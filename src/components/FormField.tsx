import * as React from "react";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ChangeEventHandler, ReactElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form/dist/types/form";
import FormList from "./FormList";
import styled from "@emotion/styled";

//const StyledCheckbox = styled(Input)``;

const StyledTextInput = styled(TextField)``;

const FormField: ((props: {
  onRegister: (name: "isRequired" | "value" | "types") => UseFormRegisterReturn;
  onCheck?: () => void;
  onRemove?: () => void;
  children?: ReactElement;
}) => ReactElement) & {
  FormList: typeof FormList;
  FormListChildren: typeof FormList;
} = function ({ onRegister, onCheck, onRemove, children }) {
  const [type, setType] = React.useState("string");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onRegister?.("isRequired").onChange(e);
    onCheck?.();
  };

  return (
    <List sx={{ textDecoration: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <StyledTextInput
          className="flex-grow"
          {...onRegister("value")}
          type="text"
          placeholder=""
          variant="outlined"
          onChange={handleChange}
          size="small"
        />
        <Select
          value={type}
          {...onRegister("types")}
          size="small"
          onChange={(e) => {
            setType(e.target.value);
            onRegister?.("types").onChange(e);
          }}
        >
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="boolean">Boolean</MenuItem>
          <MenuItem value="object">Object</MenuItem>
        </Select>
        <Switch
          {...onRegister("isRequired")}
          color="primary"
          onChange={handleChange}
        />
        <Delete onClick={onRemove} />
      </Box>
      {type === "object" && children}
      {children && <Divider />}
    </List>
  );
};

FormField.FormList = FormList;
FormField.FormListChildren = FormList;

export default FormField;
