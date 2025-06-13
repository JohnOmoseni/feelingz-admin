import { useFormik } from "formik";
import { InferType } from "yup";
import { AddStaffSchema } from "@/schema/validation";
import { Envelope, Lock } from "@/constants/icons";
import { useCreateAdmin } from "@/server/actions/staffs/useStaff";
import { accessLevels } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import FormWrapper from "../FormWrapper";
import CustomFormField, { FormFieldType } from "../CustomFormField";

const AddStaffForm = ({ closeModal }: { closeModal: () => void }) => {
  const { mutateAsync: createStaff, isPending } = useCreateAdmin();

  const onSubmit = async (values: InferType<typeof AddStaffSchema>) => {
    try {
      const data: any = {
        full_name: values.fullName,
        email: values.email,
        access_level: values.access_level,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      await createStaff(data);
      closeModal();
    } catch (error: any) {}
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        access_level: "",
        password: "",
        password_confirmation: "",
      },
      validationSchema: AddStaffSchema,
      onSubmit,
    });

  return (
    <FormWrapper buttonLabel="Add Staff" onSubmit={handleSubmit} isSubmitting={isPending}>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="fullName"
        label="Full Name"
        field={{ value: values.fullName }}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email address"
        field={{
          value: values.email,
          placeholder: "e.g user@gmail.com",
          type: "email",
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        iconSrc={Envelope}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.SELECT}
        name="access_level"
        label="Access Level"
        field={{ value: values.access_level }}
        onChange={(value: string) => {
          setFieldValue("access_level", value);
        }}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        selectList={accessLevels}
      >
        {accessLevels?.map((level) => (
          <SelectItem key={level.value} value={level.value} className="shad-select-item">
            {level.label}
          </SelectItem>
        ))}
      </CustomFormField>

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
      />
    </FormWrapper>
  );
};

export default AddStaffForm;
