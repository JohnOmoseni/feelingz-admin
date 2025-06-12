import { useFormik } from "formik";
import { InferType } from "yup";
import { AddStaffSchema } from "@/schema/validation";
import { Envelope } from "@/constants/icons";
import { ROLE } from "@/types";
import { useNavigate } from "react-router-dom";
import { useCreateAdmin } from "@/server/actions/staffs/useStaff";
import { SelectItem } from "@/components/ui/select";
import FormWrapper from "../FormWrapper";
import CustomFormField, { FormFieldType } from "../CustomFormField";

const roles = [
  {
    value: "ADMIN",
    label: "Admin",
  },
  { value: "STAFF", label: "Staff" },
];

const AddStaffForm = ({ closeModal }: { closeModal: () => void }) => {
  const { mutateAsync: createStaff, isPending } = useCreateAdmin();
  const navigate = useNavigate();

  const onSubmit = async (values: InferType<typeof AddStaffSchema>) => {
    try {
      const data: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        roleStatus: values.role as ROLE,
      };

      await createStaff(data);
      closeModal();
      navigate("/staffs/success");
    } catch (error: any) {}
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      },
      validationSchema: AddStaffSchema,
      onSubmit,
    });

  return (
    <FormWrapper buttonLabel="Add Staff" onSubmit={handleSubmit} isSubmitting={isPending}>
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="firstName"
        label="First Name"
        field={{ value: values.firstName, placeholder: "John" }}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        name="lastName"
        label="Last Name"
        field={{ value: values.lastName, placeholder: "Doe" }}
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
        name="role"
        label="Role"
        field={{ value: values.role }}
        onChange={(value: string) => {
          setFieldValue("role", value);
        }}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
        selectList={roles}
      >
        {roles?.map((role) => (
          <SelectItem key={role.value} value={role.value} className="shad-select-item">
            {role.label}
          </SelectItem>
        ))}
      </CustomFormField>
    </FormWrapper>
  );
};

export default AddStaffForm;
