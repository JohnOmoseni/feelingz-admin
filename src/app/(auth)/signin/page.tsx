import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { Envelope, Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/reuseables/CustomButton";
import { Link } from "react-router-dom";
import GoogleAuth from "../_sections/GoogleAuth";

function SignIn() {
  const { handleLogin, isLoadingAuth } = useAuth();

  const onSubmit = async (values: InferType<typeof SignInSchema>) => {
    console.log("Form submitted:", values);

    await handleLogin(values?.email, values?.password);
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit,
    });

  return (
    <>
      <div className="flex-column gap-0.5">
        <h2 className="text-2xl md:text-3xl">Welcome back!</h2>
        <p className="sm:whitespace-nowrap leading-5 tracking-wide mt-0.5 text-foreground-100">
          Welcome, let’s sign you in to your account
        </p>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              field={{
                value: values.email,
                placeholder: "",
                type: "email",
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              iconSrc={Envelope}
              touched={touched}
              tag="auth"
              inputStyles="h-10"
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
              inputStyles="h-10"
            />
          </div>
          <Button
            type="submit"
            title={isSubmitting ? "Signing in..." : "Login"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>

        <p className="leading-5 text-center mt-4 tracking-wide text-foreground-100 min-[500px]:whitespace-nowrap">
          Forgot Password?{" "}
          <Link to="/recover-password" className="text-secondary font-semibold">
            Recover
          </Link>
        </p>

        <GoogleAuth />
      </div>
    </>
  );
}

export default SignIn;
