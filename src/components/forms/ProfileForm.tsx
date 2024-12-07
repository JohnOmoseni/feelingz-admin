import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { ProfileSchema } from "@/schema/validation";
import { InferType } from "yup";
import { Value } from "react-phone-number-input";
import Button from "../reuseables/CustomButton";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import "react-phone-number-input/style.css";

type ProfileFormProps = {
  data?: any;
};

// @ts-ignore
const ProfileForm = ({ data }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: InferType<typeof ProfileSchema>) => {
    setIsLoading(true);

    const data = {};

    console.log("FORM VALUES", values, data);

    try {
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data?.name || "",
        email: data?.email || "",
        location: "",
        phone_number: data?.phone || "",
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: ProfileSchema,
      onSubmit,
    });

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      containerStyles="max-w-full"
      footerSection={
        <div className="row-flex !justify-end gap-4 px-4">
          <Button type="button" title={"Cancel"} className={cn("!w-max")} />
          <Button
            type="submit"
            title={isLoading ? "Saving..." : "Save"}
            className={cn("!w-max")}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      }
    >
      <div className="relative ">
        <div className="flex-column gap-5 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Full Name"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              field={{
                value: values.name,
                placeholder: "",
              }}
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              name={"phone_number"}
              label="Phone Number"
              field={{ value: values.phone_number }}
              onChange={(value: Value) => {
                setFieldValue("phone_number", value);
              }}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email Address"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              field={{
                value: values.email,
                placeholder: "Enter Email",
              }}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name={"location"}
              label="Location"
              field={{ value: values.location }}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </div>
        </div>

        <div className="pt-4 px-4 mt-6 w-full border-t border-border flex-column gap-5">
          <p className="text-lg font-semibold tracking-wide">Account</p>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="old_password"
            label="Old Password"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            tag="auth"
            field={{
              value: values.old_password,
              type: "password",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="new_password"
              label="New Password"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              tag="auth"
              field={{
                value: values.new_password,
                type: "password",
              }}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="confirm_password"
              label="Confirm Password"
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              tag="auth"
              field={{
                value: values.confirm_password,
                type: "password",
              }}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ProfileForm;
