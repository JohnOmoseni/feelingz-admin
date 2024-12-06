import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SelectItem } from "@/components/ui/select";
import { AddAdminSchema } from "@/schema/validation";
import { InferType } from "yup";
import { useCreateUser } from "@/hooks/useUser";
import { Value } from "react-phone-number-input";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import "react-phone-number-input/style.css";

type AddAdminProps = {
  closeModal?: () => void;
};

const AddAminForm = ({ closeModal }: AddAdminProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const createUserMutation = useCreateUser();

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const onSubmit = async (values: InferType<typeof AddAdminSchema>) => {
    setIsLoading(true);

    const data = {
      name: values.name,
      is_admin: values.role === "admin" ? 1 : 0,
      email: values.email,
      phone: values.phone_number?.startsWith("+234")
        ? `0${values.phone_number.slice(4)}`
        : values.phone_number,
    };

    try {
      await createUserMutation.mutateAsync(data);
      toast.success("User created successfully");

      closeModal && closeModal();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error creating user");
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        role: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: AddAdminSchema,
      onSubmit,
    });

  return (
    <FormWrapper
      btnStyles="!w-max ml-auto"
      containerStyles="max-w-full"
      buttonLabel="Add Admin"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
      <div className="relative flex-column gap-5">
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
            fieldType={FormFieldType.SELECT}
            name="role"
            label="Role"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.role,
              placeholder: "Select Role",
            }}
            onChange={(value: any) => {
              setFieldValue("role", value);
            }}
            selectList={roles}
          >
            {roles?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

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

        <p className="text-lg font-medium leading-3 mt-2">Security</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            label="Password"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            tag="auth"
            field={{
              value: values.password,
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
    </FormWrapper>
  );
};

export default AddAminForm;
