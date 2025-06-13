import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/reuseables/CustomButton";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { Lock } from "@/constants/icons";
import { ResetPasswordSchema } from "@/schema/validation";

function UpdatePassword() {
  const { handleResetPassword, isLoadingAuth } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  const reset_token = state?.reset_token ?? "";

  const onSubmit = async (values: InferType<typeof ResetPasswordSchema>) => {
    await handleResetPassword(values?.password, values?.password_confirmation, reset_token);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit,
  });

  return (
    <>
      <div className="flex-column items-center gap-2">
        <h2 className="text-2xl text-center md:text-3xl">Password Update</h2>
        <p className="tracking-tighter text-center text-foreground-100 font-light">
          Set a new password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-column w-full flex-1 gap-8 pt-3">
        <div className="flex-column gap-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            label="New Password"
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

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password_confirmation"
            label="Re-enter Password"
            field={{
              value: values.password_confirmation,
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

        <div className="flex-column gap-3">
          <CustomButton
            type="submit"
            title={isLoadingAuth ? "Updating..." : "Update Password"}
            className="mt-auto w-full"
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />

          <CustomButton
            type="button"
            title="Back to Login"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/signin")}
          />
        </div>
      </form>
    </>
  );
}

export default UpdatePassword;
