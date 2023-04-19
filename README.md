# Task
## 1. Create such component

Ans :
Main Component :
 `FormLayout => FormList => FormField`

## 2. Assume a Schema for this, how you will represent this data. Write that down.

Ans : the following schema:
1. The top-level data entity is `FormValues`.
2. FormValues has one property, nestedList, which is an array of `NestedList` entities.
3. NestedList is an array of objects, each of which has properties `value, types, isRequired, and optionally list`.
4. List is an array of `Todo` entities.
5. Todo has properties `value, types, and isRequired`.

![save](https://user-images.githubusercontent.com/78078088/233141986-e9ab8b11-c072-4eb9-85bd-e852ab444390.png)



## 3. Write down how you will handle this, what components you will create.
Ans :
1. The component imports two types, FormValues and NestedList, that are used to define the structure of the form data.The component uses the useForm hook from the react-hook-form library to manage the form state. It initializes the form with default values, which are either retrieved from the localStorage if they exist, or set to the initialList defined earlier in the code.

2. The component renders a FormList component that takes several props, including the name of the list in the form data, the control object provided by react-hook-form, and functions to render the add and remove buttons for each field in the list.

3. Inside the FormList component, the renderList function is called for each field in the list. It renders a FormField component, which is another custom component that handles the rendering of the form inputs for each field.

4. The FormField component takes several props, including onRegister, which is a function that registers the form input with react-hook-form, onCheck, which is a function that updates the form values based on user input, and onRemove, which is a function that removes the field from the list.

5. The FormField component also renders a FormList component for nested fields, which uses similar props and functions to render and manage the sub-fields.

Finally, the component renders a Button component that saves the form data to localStorage when clicked, using the handleSave function defined earlier in the code.


![Diagram](https://user-images.githubusercontent.com/78078088/233142758-2784807d-ab10-42ad-bfa7-2e00e31a2d03.png)


