import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Envelope, Lock } from "@/constants/icons";
import { SignInSchema } from "@/schema/validation";
import CustomButton from "@/components/reuseables/CustomButton";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";

function SignIn() {
  const location = useLocation();
  const { handleLogin, isLoadingAuth } = useAuth();

  const onSubmit = async (values: InferType<typeof SignInSchema>) => {
    const returnTo = location.state?.returnTo || "/";

    await handleLogin(values?.email, values?.password, returnTo);
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
      <div className="flex-column items-center gap-1">
        <h2 className="">Welcome back!</h2>
        <p className="tracking-tighter text-foreground-100">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-column pt-3.5 w-full flex-1 gap-8">
        <div>
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
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
            />
          </div>

          <p className="tracking-wide text-end leading-4 mt-3.5 text-xs">
            Forgot Password?{" "}
            <Link to="/recover-password" className="font-semibold">
              Recover
            </Link>
          </p>
        </div>

        <CustomButton
          type="submit"
          title={isSubmitting ? "Signing in..." : "Sign in"}
          disabled={isLoadingAuth}
          isLoading={isLoadingAuth}
          className="w-full mt-4"
        />
      </form>
    </>
  );
}

export default SignIn;
