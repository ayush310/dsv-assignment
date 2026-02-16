import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import {
  userSchema,
  getInitialFormState,
  validateForm,
} from "../config/userSchema";

const UserForm = ({ user, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(getInitialFormState());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const updatedData = { ...getInitialFormState(), ...user };
      setFormData(updatedData);
    } else {
      setFormData(getInitialFormState());
    }
  }, [user]);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-header">
        <h2 className="form-title">{user ? "Edit User" : "New User"}</h2>
        <p className="form-subtitle">
          {user
            ? "Update user information"
            : "Fill in the details to create a new user"}
        </p>
      </div>

      <div className="form-fields">
        {userSchema.map((field) => (
          <FormInput
            key={field.name}
            field={field}
            value={formData[field.name] || ""}
            onChange={handleChange}
            error={errors[field.name]}
            disabled={isSubmitting}
          />
        ))}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {user ? "Updating..." : "Creating..."}
            </>
          ) : user ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
