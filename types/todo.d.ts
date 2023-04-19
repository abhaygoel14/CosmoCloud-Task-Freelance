type FormValues = {
  nestedList: NestedList;
};

type NestedList = (Todo & {
  list?: List;
})[];

type List = Todo[];

type Todo = {
  value: string;
  types: string;
  isRequired: boolean;
};

export type { FormValues, NestedList };
