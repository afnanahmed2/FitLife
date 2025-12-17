import * as yup from "yup"; //import all exports from the yup

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),

  phoneNum: yup
    .string()
    .length(8, "Phone number must be 8 digits")
    .required("Mobile Phone is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .min(1, "Invalid age")
    .max(120, "Invalid age")
    .required("Age is required"),

  gender: yup.string().required("Gender is required"),

  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password must be less than 20 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required("Please confirm your password"),
});
