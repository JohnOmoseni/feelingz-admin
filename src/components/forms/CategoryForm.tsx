import { useState } from "react";
import { FieldArray, Formik } from "formik";
import { toast } from "sonner";
import { CategorySchema } from "@/schema/validation";
import { Remove } from "@/constants/icons";
import { InferType } from "yup";
import { useCreateCategory, useEditCategory } from "@/hooks/useCategory";
import Button from "../reuseables/CustomButton";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import FormFileUpload from "./FormFileUpload";

type CategoryProps = {
  data?: any;
  type: "add" | "edit";
  closeModal?: () => void;
};

interface FormValues {
  name: string;
  description: string;
  mediaImage: any;
  sub_category: {
    id: string;
    value: string;
  }[];
}

const CategoryForm = ({ data, type, closeModal }: CategoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const createCategoryMutation = useCreateCategory();
  const editCategoryMutation = useEditCategory();

  const onSubmit = async (values: InferType<typeof CategorySchema>) => {
    setIsLoading(true);

    const payload = {
      name: values.name,
      description: values.description,
      group: "cars",
      avatar_url: values.mediaImage,
      ...(type === "edit" ? { category_id: data?.id } : {}),
      // sub_category: values.sub_category,
    };

    try {
      const mutation = type === "add" ? createCategoryMutation : editCategoryMutation;
      await mutation.mutateAsync(payload);

      toast.success(`Category ${type === "add" ? "added" : "updated"} successfully`);
      closeModal?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error adding or updating category");
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues: FormValues = {
    name: data?.name || "",
    description: data?.description || "",
    mediaImage: data?.avatar || "",
    sub_category:
      data?.sub_category ||
      Array.from({ length: 1 }).map((_, idx) => ({
        id: idx + 1,
        value: "",
      })),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CategorySchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit }) => {
        console.log("ERRORS", errors);
        return (
          <FormWrapper
            btnStyles="!w-max ml-auto"
            containerStyles="max-w-full "
            buttonLabel="Add Category"
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
          >
            <div className="relative flex-column gap-3">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Title/Name"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                field={{
                  value: values.name,
                  placeholder: "Category Name",
                }}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                name="description"
                label="Description"
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                field={{
                  value: values.description,
                  placeholder: "Category Description",
                }}
              />

              {/* SUB CATEGORY  */}
              <FieldArray
                name="sub_category"
                render={(arrayHelpers) => (
                  <div className="flex-column gap-2">
                    {values.sub_category?.map((category, index) => (
                      <div key={index + 1} className="w-full relative">
                        <div
                          className="ml-auto z-50 flex text-xs w-max text-red-500 font-semibold cursor-pointer"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <Remove className="size-5" />
                        </div>

                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          name={`sub_category.${index}.value`}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          onChange={handleChange}
                          field={{
                            value: category.value,
                            placeholder: "Sub-category Name",
                          }}
                        />

                        {(errors?.sub_category?.[index] as any)?.value &&
                        touched?.sub_category?.[index]?.value ? (
                          <p className="text-red-500 text-xs mt-1 font-semibold ml-1">
                            {(errors?.sub_category?.[index] as any).value}
                          </p>
                        ) : null}

                        {!Array.isArray(errors?.sub_category) && touched?.sub_category ? (
                          <p className="text-red-500 text-xs mt-1 font-semibold ml-1">
                            {errors?.sub_category as any}
                          </p>
                        ) : null}
                      </div>
                    ))}

                    <Button
                      title="Add a new Sub Category"
                      className=""
                      onClick={() =>
                        arrayHelpers.push({ id: String(values.sub_category.length + 1), value: "" })
                      }
                    />
                  </div>
                )}
              />

              <div className="mt-3">
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  name="mediaImage"
                  errors={errors}
                  onBlur={handleBlur}
                  touched={touched}
                  renderSkeleton={() => (
                    <FormFileUpload
                      title="Add Images (Optional)"
                      name="mediaImage"
                      onFileChange={(file) => setFieldValue("mediaImage", file)}
                    />
                  )}
                />
              </div>
            </div>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
