const TextInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
