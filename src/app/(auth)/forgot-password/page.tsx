import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import { Envelope } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/reuseables/CustomButton";
import * as yup from "yup";
import BackArrow from "@/components/reuseables/BackArrow";

type FormValues = {
  email: string;
};

function ForgotPassword() {
  const { isLoadingAuth, handleForgotPassword } = useAuth();

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted:", values);

    await handleForgotPassword(values.email);
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
      }),
      onSubmit,
    });

  return (
    <>
      <div className="absolute -top-[45px] left-1">
        <BackArrow />
      </div>
      <div className="flex-column gap-1">
        <h2 className="text-2xl md:text-3xl">Forgot your password</h2>
        <p className="leading-5 mt-1 tracking-wide text-foreground-100 w-full">
          Forgot your password? Enter your email to receive a One Time Password (OTP)
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
              inputStyles="h-11"
            />
          </div>

          <Button
            type="submit"
            title={isSubmitting ? "Sending..." : "Send"}
            className={cn("!mt-auto !w-full !py-5")}
            disabled={isLoadingAuth}
            isLoading={isLoadingAuth}
          />
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
