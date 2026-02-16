export const userSchema = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      errorMessage:
        "First name must contain only letters, spaces, hyphens, and apostrophes",
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      errorMessage:
        "Last name must contain only letters, spaces, hyphens, and apostrophes",
    },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "+1 (555) 123-4567",
    validation: {
      pattern: /^[\d\s\-\+\(\)]+$/,
      minLength: 10,
      maxLength: 20,
      errorMessage: "Please enter a valid phone number",
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "name@example.com",
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Please enter a valid email address",
    },
  },
  // Add new fields here - they will automatically appear in the UI
  // {
  //   name: 'dateOfBirth',
  //   label: 'Date of Birth',
  //   type: 'date',
  //   required: false,
  //   validation: {
  //     errorMessage: 'Please enter a valid date'
  //   }
  // }
];

export const getInitialFormState = () => {
  return userSchema.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
};

export const validateField = (field, value) => {
  if (field.required && !value.trim()) {
    return `${field.label} is required`;
  }

  if (!value.trim()) {
    return null;
  }

  const validation = field.validation;
  if (!validation) return null;

  if (validation.minLength && value.length < validation.minLength) {
    return `${field.label} must be at least ${validation.minLength} characters`;
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return `${field.label} must be no more than ${validation.maxLength} characters`;
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.errorMessage || `${field.label} is invalid`;
  }

  return null;
};

export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  userSchema.forEach((field) => {
    const error = validateField(field, formData[field.name] || "");
    if (error) {
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
