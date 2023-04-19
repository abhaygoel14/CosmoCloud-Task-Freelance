import * as React from "react";
import { ReactElement } from "react";
import { useFieldArray } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";
import { FormValues } from "../../types/todo";
import { Box } from "@mui/material";

const FormList: (props: {
  name: "nestedList" | `nestedList.${number}.list`;
  control: Control<FormValues>;
  renderAddButton?: (
    append: (todo: {
      value: string;
      types: string;
      isRequired: boolean;
      list?: { value: string; types: string; isRequired: boolean }[];
    }) => void
  ) => ReactElement;
  renderList?: (
    fieldId: string,
    index: number,
    onRemove: () => void
  ) => ReactElement;
}) => ReactElement = function ({ name, control, renderAddButton, renderList }) {
  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <>
      {renderAddButton?.((todo) => append(todo as any))}
      {renderList && (
        <Box
          sx={{
            alignItems: "center",
            width: "500px",
            gap: 3,
          }}
        >
          {fields.map((field: { id: string }, index) =>
            renderList(field.id, index, () => remove(index))
          )}
        </Box>
      )}
    </>
  );
};

export default FormList;
