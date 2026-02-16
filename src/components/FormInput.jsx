import { useState } from "react";

const FormInput = ({ field, value, onChange, error, disabled }) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = touched && error;

  return (
    <div className="form-group">
      <label htmlFor={field.name} className="form-label">
        {field.label}
        {field.required && <span className="required-mark">*</span>}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        disabled={disabled}
        className={`form-input ${showError ? "error" : ""} ${value ? "filled" : ""}`}
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? `${field.name}-error` : undefined}
      />
      {showError && (
        <span id={`${field.name}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
