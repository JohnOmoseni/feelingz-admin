import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { Lock } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { PasswordSchema } from "@/schema/validation";
import { useFormik } from "formik";
import { InferType } from "yup";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/reuseables/CustomButton";

function ChangePassword() {
  const { isLoadingAuth, handleResetPassword, user } = useAuth();

  const onSubmit = async (values: InferType<typeof PasswordSchema>) => {
    console.log("Form submitted:", values);

    await handleResetPassword(user?.email || "", values.confirm_password, values.otpValue);
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        otpValue: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: PasswordSchema,
      onSubmit,
    });

  return (
    <>
      <div className="flex-column gap-0.5">
        <h2 className="text-2xl md:text-3xl">Change Password</h2>
        <p className="leading-5 tracking-wide text-foreground-100">
          Create a new password for your account. Make sure it’s strong and secure.
        </p>
      </div>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="flex-column flex-1 gap-9">
          <div className="flex-column gap-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="otpValue"
              label="Enter OTP"
              field={{
                value: values.otpValue,
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
              name="new_password"
              label="New Password"
              field={{
                value: values.new_password,
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
              label="Confirm New Password"
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
            title={isSubmitting ? "Updating..." : "Update"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
