import * as React from "react";
import { useForm } from "react-hook-form"; // react hook
import { FC } from "react";
import { FormValues, NestedList } from "../../types/todo";
import { Box, Button, Typography } from "@mui/material";
import FormList from "./FormList";
import FormField from "./FormField";
import useIsLargeView from "../../utils/useIsLargeView";

const initialList: NestedList = [
  {
    value: "general",
    types: "string",
    isRequired: true,
  },
  {
    value: "general",
    types: "object",
    isRequired: true,
    list: [
      {
        value: "number",
        types: "boolean",
        isRequired: true,
      },
      {
        value: "number",
        types: "boolean",
        isRequired: true,
      },
    ],
  },
];

const FormLayout: FC = () => {
  const { control, register, getValues, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {
        nestedList: localStorage.getItem("List")
          ? JSON.parse(localStorage.getItem("List") as string)
          : initialList,
      },
    });
  const isLarge = useIsLargeView(650);
  const handleSave = handleSubmit((value) => {
    localStorage.setItem("List", JSON.stringify(value.nestedList));
    console.log("List saved in local storage. Check there", value.nestedList);
  });
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          margin: isLarge ? "50px auto" : "50px 4px",
          width: isLarge ? "560px" : "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Fields names & types</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mx: 0,
            }}
          >
            <Button onClick={handleSave}>↑ Save</Button>
          </Box>
        </Box>
        <FormList
          name="nestedList"
          control={control}
          renderAddButton={(append) => (
            <>
              <Button
                onClick={() => {
                  append({
                    value: "",
                    types: "Boolean",
                    isRequired: false,
                  });
                }}
              >
                + Add
              </Button>
            </>
          )}
          renderList={(fieldId, index, onRemove) => (
            <Box key={fieldId} sx={{ mb: 2 }}>
              <FormField
                key={fieldId}
                onRegister={(name) => register(`nestedList.${index}.${name}`)}
                onCheck={() => {
                  const todo = getValues(`nestedList.${index}`);
                  todo.list?.forEach((_, subIndex) => {
                    setValue(
                      `nestedList.${index}.list.${subIndex}.isRequired`,
                      todo.isRequired
                    );
                  });
                }}
                onRemove={onRemove}
              >
                <Box sx={{ display: "flex", gap: "1" }}>
                  <FormField.FormList
                    name={`nestedList.${index}.list`}
                    control={control}
                    renderAddButton={(append) => (
                      <>
                        <Button
                          onClick={() => {
                            append({
                              value: "",
                              types: "Object",
                              isRequired: false,
                              list: [],
                            });
                            if (
                              getValues(`nestedList.${index}.isRequired`) ===
                              true
                            ) {
                              setValue(`nestedList.${index}.isRequired`, false);
                            }
                          }}
                        >
                          +
                        </Button>
                      </>
                    )}
                    renderList={(subField, subIndex, onRemove) => (
                      <Box key={subField} sx={{ mb: 2 }}>
                        <FormField
                          onRegister={(name) =>
                            register(
                              `nestedList.${index}.list.${subIndex}.${name}`
                            )
                          }
                          onCheck={() => {
                            const subTodoList =
                              getValues(`nestedList.${index}.list`) || [];
                            if (subTodoList.every((todo) => todo.isRequired)) {
                              return setValue(
                                `nestedList.${index}.isRequired`,
                                true
                              );
                            }
                            setValue(`nestedList.${index}.isRequired`, false);
                          }}
                          onRemove={onRemove}
                        />
                      </Box>
                    )}
                  />
                </Box>
              </FormField>
            </Box>
          )}
        />
      </Box>
    </>
  );
};

export default FormLayout;
