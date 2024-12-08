import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const PasswordSchema = yup.object().shape({
  otpValue: yup
    .string()
    .matches(/^\d{4}$/, "OTP must be a 4-digit number")
    .required("OTP is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const AddAdminSchema = yup.object().shape({
  name: yup
    .string()
    .required("Field is required")
    .min(6, "Field must be at least 6 characters")
    .test("is-full-name", "Enter Full name", (value: any) => {
      return value && value.trim().split(" ").length >= 2;
    }),
  role: yup.string().oneOf(["admin", "staff", ""], "").default("admin"),
  email: yup.string().email("Invalid email address").required("Email Address is required"),
  phone_number: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => isValidPhoneNumber(value!, "NG") // Validate if it's a valid Nigerian phone number
    )
    .required("Phone Number is required"),
});

export const CategorySchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().min(5, "Description must be at least 5 characters"),
  sub_category: yup.array().of(
    yup.object().shape({
      value: yup.string().required("Sub Category is required"),
    })
  ),
  // .min(2, "At least two options are required"),
});

export const ProfileSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  email: yup.string().email("Invalid email address").required("Email Address is required"),
  phone_number: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => isValidPhoneNumber(value!, "NG") // Validate if it's a valid Nigerian phone number
    )
    .required("Phone Number is required"),
  location: yup.string().required("Location is required"),
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      passwordRegex,
      "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your new password"),
});

export const PostSchema = yup
  .object()
  .shape({
    name: yup.string().required("Title is required"),
    listingType: yup.string().required("Listing type is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    lga: yup.string().required("LGA is required"),
    district: yup.string(),
    amount: yup.string().required("Discount price is required"),
    actual_amount: yup.string().required("Actual price is required"),
    category: yup.string().required("Category is required"),
    is_negotiable: yup.boolean().required("Negotiability status is required"),

    // Dynamic fields (optional and flexible)
  })
  .test("dynamic-fields", "Optional dynamic fields validation", function (value) {
    const keys = Object.keys(value || {});

    for (let key of keys) {
      if (!(key in this.schema.fields)) {
        this.schema.fields[key] = yup.mixed(); // Allows any type for unknown dynamic fields
      }
    }

    return true;
  });
