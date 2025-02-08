const TextInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  className,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="cv-input-group">
      {label && (
        <label htmlFor={inputId} className="cv-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`cv-input ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextInput;
