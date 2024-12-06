import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/reuseables/CustomButton";
import { Link } from "react-router-dom";
import GoogleAuth from "../_sections/GoogleAuth";

function SignUp() {
  const { handleLogin, isLoadingAuth } = useAuth();

  const onSubmit = async (values: InferType<typeof SignUpSchema>) => {
    console.log("Form submitted:", values);

    await handleLogin(values?.email, values?.password);
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit,
    });

  return (
    <>
      <div className="flex-column gap-0.5">
        <h2 className="text-2xl md:text-3xl">Sign Up</h2>
        <p className="whitespace-normal leading-5 tracking-wide text-foreground-100 min-[500px]:w-max">
          Already have an account?{" "}
          <Link to="/signin" className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="username"
              label="Username"
              field={{
                value: values.username,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              field={{
                value: values.email,
                type: "email",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Envelope}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="password"
              label="Password"
              field={{
                value: values.password,
                type: "password",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Lock}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="confirm_password"
              label="Confirm Password"
              field={{
                value: values.confirm_password,
                type: "password",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Lock}
              touched={touched}
              tag="auth"
              inputStyles="h-11"
            />
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Signing up..." : "Sign up"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>

        <GoogleAuth />
      </div>
    </>
  );
}

export default SignUp;
