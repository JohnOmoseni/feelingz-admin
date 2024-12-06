import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { SelectItem } from "@/components/ui/select";
import { categoryFields, leasedFields, listingTypes, mainCategories } from "@/constants";
import { DynamicFieldType } from "@/types";
import { generateInitialValues } from "@/lib";
import { CheckedState } from "@radix-ui/react-checkbox";
import { InferType } from "yup";
import { PostSchema } from "@/schema/validation";
import { useGetStateLGAs, useGetStates } from "@/hooks/useUtils";
import { usePostListing } from "@/hooks/useListing";

import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import FormFileUpload from "./FormFileUpload";

export interface FormValues {
  name: string;
  listingType: string;
  description: string;
  address: string;
  state: string;
  lga: string;
  district: string;
  amount: string;
  actual_amount: string;
  category: string;
  mediaImage: string;
  is_negotiable: boolean;
  [key: string]: any;
}

type PostPropertyProps = {
  type: "post" | "edit";
  data?: any;
  categoryType?: "Land" | "Property" | "Automobile";
  closeModal?: () => void;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
};

const PostProperty = ({
  data,
  type,
  categoryType,
  closeModal,
  setSelectedCategory,
}: PostPropertyProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<DynamicFieldType[]>([]);
  const [selectedState, setSelectedState] = useState("");

  const postLisitingMutuation = usePostListing();

  const { data: states } = useGetStates();
  const { data: lgas } = useGetStateLGAs({ state_id: selectedState });

  const onSubmit = async (values: InferType<typeof PostSchema>) => {
    setIsLoading(true);

    const dynamicFieldsObj = dynamicFields.reduce((acc, key) => {
      const value = (values as any)[key?.name];
      if (value !== "" && value !== undefined) {
        acc[key?.name] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    const data = {
      name: values.name,
      description: values.description,
      amount: values.amount,
      actual_amount: values.actual_amount,
      is_negotiatable: values.is_negotiable,
      condition: "new",
      address: values.address,

      main_category_id: 1,
      sub_categories: [6],

      state_id: values.state,
      lga_id: values.lga,
      district: values.district,
      media: [...files],
      ...dynamicFieldsObj,
    };

    console.log("FORM VALUES", files, dynamicFieldsObj, data);

    if (type === "post") {
    } else if (type === "edit") {
    }

    try {
      await postLisitingMutuation.mutateAsync(data);

      toast.success(`Uploaded Successfully`);
      closeModal && closeModal();
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(message || "Error uploading");
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: generateInitialValues(categoryType, data),
      validationSchema: PostSchema,
      onSubmit,
    });

  useEffect(() => {
    if (categoryType) {
      setDynamicFields(categoryFields[categoryType] || []);
    } else {
      setDynamicFields([]);
    }
  }, [categoryType]);

  useEffect(() => {
    if (values.state) {
      setSelectedState(values.state);
    }
  }, [values.state]);

  useEffect(() => {
    let fields = categoryFields[values.category || ""] || [];

    // Check if category is "Land" and isLeased is true
    if (values.category === "Land" && values.is_leased) {
      fields = [...fields, ...leasedFields];
    }

    setDynamicFields(fields);
  }, [values.category, values.is_leased]);

  console.log("ERRORS", errors);

  return (
    <FormWrapper
      btnStyles="w-max"
      containerStyles="max-w-full"
      buttonLabel="Submit"
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    >
      <div className="relative flex-column gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
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
              placeholder: "",
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="listingType"
            label="Listing Type"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.listingType,
              placeholder: "",
            }}
            onChange={(value: any) => {
              setFieldValue("listingType", value);
            }}
            selectList={listingTypes}
          >
            {listingTypes?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

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
            placeholder: "Type Description",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.address,
            placeholder: "Type Address",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="district"
          label="District"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.district,
            placeholder: "District (e.g., Downtown, Central)",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="state"
          label="State"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.state,
            placeholder: "",
          }}
          selectContainerStyles="max-h-72"
          onChange={(value: any) => {
            setFieldValue("state", value);
          }}
          selectList={states}
        >
          {states?.map((item, index) => (
            <SelectItem key={index} value={item?.value} className="shad-select-item">
              {item?.label}
            </SelectItem>
          ))}
        </CustomFormField>

        {selectedState && (
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="lga"
            label="LGA"
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            field={{
              value: values.lga,
              placeholder: "",
            }}
            onChange={(value: string) => {
              setFieldValue("lga", value);
            }}
            selectList={lgas}
          >
            {lgas?.map((item, index) => (
              <SelectItem key={index} value={item?.value} className="shad-select-item">
                {item?.label}
              </SelectItem>
            ))}
          </CustomFormField>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="amount"
            label={"Discount Price (\u20A6)"}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.amount,
              placeholder: "",
            }}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="actual_amount"
            label={"Actual Price (\u20A6)"}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            field={{
              value: values.actual_amount,
              placeholder: "",
            }}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="category"
          label="Category (For Properties)"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.category,
            placeholder: "",
          }}
          onChange={(value: any) => {
            setFieldValue("category", value);
            setSelectedCategory && setSelectedCategory(value);
          }}
          selectList={mainCategories}
        >
          {mainCategories?.map((item, index) => (
            <SelectItem key={index} value={item?.value} className="shad-select-item">
              {item?.label}
            </SelectItem>
          ))}
        </CustomFormField>

        {dynamicFields?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {dynamicFields.map((field, index) => (
              <Fragment key={index}>
                {field.type === FormFieldType.SELECT ? (
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    key={index}
                    name={field.name}
                    label={field.label}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    field={{
                      value: (values as Record<string, any>)[field.name],
                      placeholder: field.placeholder,
                    }}
                    onChange={(value: any) => {
                      setFieldValue(field.name, value);
                    }}
                    selectList={field?.options}
                  >
                    {field?.options?.map((item, index) => (
                      <SelectItem key={index} value={item?.value} className="shad-select-item">
                        {item?.label}
                      </SelectItem>
                    ))}
                  </CustomFormField>
                ) : field.type === FormFieldType.CHECKBOX ? (
                  <CustomFormField
                    key={index}
                    fieldType={field.type}
                    name={field.name}
                    label={field.label}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    onChange={(checked: CheckedState) => {
                      setFieldValue(field.name, checked);
                    }}
                    field={{
                      value: (values as Record<string, any>)[field.name],
                      placeholder: field.placeholder,
                    }}
                  />
                ) : (
                  <CustomFormField
                    key={index}
                    fieldType={field.type}
                    name={field.name}
                    label={field.label}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    onChange={handleChange}
                    field={{
                      value: (values as Record<string, any>)[field.name],
                      placeholder: field.placeholder,
                      type: field.inputType,
                    }}
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}

        <div className="mt-2">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="mediaImage"
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
            renderSkeleton={() => (
              <FormFileUpload
                title="Upload Images (At least 5 images)"
                name="mediaImage"
                onFileChange={(files) => setFiles(files)}
              />
            )}
          />
        </div>

        {/* <div className="mt-2">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="mediaImage"
            errors={errors}
            onBlur={handleBlur}
            touched={touched}
            renderSkeleton={() => (
              <TestFormFileUpload
                title="Upload Images (At least 5 images)"
                name="mediaImage"
                onFileChange={(files) => setFiles(files)}
              />
            )}
          />
        </div> */}
      </div>
    </FormWrapper>
  );
};

export default PostProperty;
