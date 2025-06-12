import { useFormik } from "formik";
import { useCreateChannel, useEditChannel } from "@/server/actions/contents/useContent";
import { useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import Dropzone from "../Dropzone";

import * as yup from "yup";

type ChannelFormProps = {
  type?: "create" | "edit";
  data?: any;
  closeModal: () => void;
};

const ChannelForm = ({ type = "create", data, closeModal }: ChannelFormProps) => {
  const { mutateAsync: createChannel, isPending: isCreating } = useCreateChannel();
  const { mutateAsync: editChannel, isPending: isEditing } = useEditChannel();
  const [_selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const onSubmit = async (values: any) => {
    const payload = {
      channelName: values.channel_name,
      profilePic: values.profile_pic,
    };

    try {
      if (type === "edit") {
        await editChannel({ channel_id: data.channel_id, ...payload });
      } else {
        await createChannel(payload);
      }

      closeModal();
    } catch (error: any) {}
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        channel_name: data?.channel_name || "",
        profile_pic: data?.profile_pic || "",
      },
      validationSchema: yup.object().shape({
        channel_name: yup
          .string()
          .min(2, "Channel name must be at least 2 characters")
          .max(50, "Channel name cannot exceed 50 characters")
          .matches(/^[A-Za-z\s]+$/, "Channel name can only contain letters and spaces")
          .required("Channel name is required"),
        profile_pic: yup.mixed().required("Profile picture is required"),
      }),
      onSubmit,
    });

  return (
    <FormWrapper
      containerStyles="max-w-full"
      onSubmit={handleSubmit}
      footerSection={
        <div className="flex flex-col-reverse min-[500px]:grid grid-cols-[1fr_1fr] gap-x-4 gap-y-2">
          <CustomButton
            title="Cancel"
            type="button"
            variant="outline"
            onClick={closeModal}
            className="flex-1 w-full"
          />

          <CustomButton
            title={`${type === "edit" ? "Edit" : "Create"} Channel`}
            type="submit"
            isLoading={isCreating || isEditing}
            className="flex-1 w-full"
          />
        </div>
      }
    >
      <div className="relative flex-column gap-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="channel_name"
          label="Channel Name"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.channel_name,
            placeholder: "e.g. Self-care...",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="profile_pic"
          label="Channel Profile picture"
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
          renderSkeleton={() => (
            <Dropzone
              name="profile_pic"
              onFileChange={(files: FileList) => {
                setFieldValue("profile_pic", files?.[0]);
                setSelectedFiles(files);
              }}
            />
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default ChannelForm;
