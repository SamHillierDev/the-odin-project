import { useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import {
  educationDetails,
  experienceDetails,
  personalDetails,
} from "./data/formFields";

const App = () => {
  const initialiseForm = (fields) =>
    fields.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {});

  const [formData, setFormData] = useState({
    personal: initialiseForm(personalDetails),
    education: initialiseForm(educationDetails),
    experience: initialiseForm(experienceDetails),
  });

  const [isEditing, setIsEditing] = useState({
    personal: true,
    education: true,
    experience: true,
  });

  const handleChange = (section) => (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleSubmit = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: false }));
  };

  const handleEdit = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: true }));
  };

  const renderFormSection = (title, section, fields) => {
    const sectionValues = formData[section];

    return (
      <section className="cv-section">
        <h2 className="section-title">{title}</h2>
        {isEditing[section] ? (
          <>
            {fields.map(({ name, ...inputProps }) => (
              <TextInput
                key={name}
                name={name}
                value={sectionValues[name]}
                onChange={handleChange(section)}
                className="cv-input"
                {...inputProps}
              />
            ))}
            <button
              className="cv-btn submit"
              onClick={() => handleSubmit(section)}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <div className="cv-display">
              {fields.map(({ name, label }) => (
                <p key={name}>
                  <strong>{label}: </strong> {sectionValues[name]}
                </p>
              ))}
            </div>
            <button className="cv-btn edit" onClick={() => handleEdit(section)}>
              Edit
            </button>
          </>
        )}
      </section>
    );
  };

  return (
    <div className="cv-container">
      <h1 className="cv-header">Curriculum Vitae</h1>
      {renderFormSection("Personal Details", "personal", personalDetails)}
      {renderFormSection("Education", "education", educationDetails)}
      {renderFormSection("Experience", "experience", experienceDetails)}
    </div>
  );
};

export default App;
