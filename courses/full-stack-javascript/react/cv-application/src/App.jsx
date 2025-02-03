import { useState } from "react";
import TextInput from "./components/TextInput";
import { educationDetails, personalDetails } from "./data/formFields";

const App = () => {
  const initialiseForm = (fields) =>
    fields.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {});

  const [formData, setFormData] = useState({
    personal: initialiseForm(personalDetails),
    education: initialiseForm(educationDetails),
  });

  const handleChange = (section) => (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const renderFormSection = (title, section, fields) => {
    const sectionValues = formData[section];

    return (
      <section>
        <h2>{title}</h2>
        {fields.map(({ name, ...inputProps }) => (
          <TextInput
            key={name}
            name={name}
            value={sectionValues[name]}
            onChange={handleChange(section)}
            {...inputProps}
          />
        ))}
      </section>
    );
  };

  return (
    <>
      {renderFormSection("Personal Details", "personal", personalDetails)}
      {renderFormSection("Education", "education", educationDetails)}
    </>
  );
};

export default App;
