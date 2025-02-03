import { useState } from "react";
import TextInput from "./components/TextInput";
import { personalDetails } from "./data/formFields";

const App = () => {
  const [formData, setFormData] = useState(
    personalDetails.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  return (
    <>
      {personalDetails.map(({ name, ...rest }) => (
        <TextInput
          key={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          {...rest}
        />
      ))}
    </>
  );
};

export default App;
