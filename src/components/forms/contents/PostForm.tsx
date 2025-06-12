import { useFormik } from "formik";
import { SelectItem } from "@/components/ui/select";
import { useCreateChannel, useEditChannel } from "@/server/actions/contents/useContent";
import { useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import Dropzone from "../Dropzone";

type PostFormProps = {
  type?: "create" | "edit";
  post?: any;
  closeModal: () => void;
};

const PostForm = ({ type = "create", post, closeModal }: PostFormProps) => {
  const { mutateAsync: createChannel, isPending: isCreating } = useCreateChannel();
  const { mutateAsync: editChannel, isPending: isEditing } = useEditChannel();
  const [_selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const onSubmit = async (values: any) => {
    const payload = {
      channelName: values.channel_name,
      profilePic: values.profile_pic,
      tagline: values.tagline,
      content: values.content,
    };

    try {
      if (type === "edit") {
        await editChannel({ channel_id: post.post_id, ...payload });
      } else {
        await createChannel(payload);
      }

      closeModal();
    } catch (error: any) {}
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        channel: "",
        tagline: "",
        content: "",
        media: "",
      },
      validationSchema: "",
      onSubmit,
    });

  return (
    <FormWrapper
      containerStyles="max-w-full"
      onSubmit={handleSubmit}
      footerSection={
        <div className="flex flex-col-reverse min-[500px]:row-flex gap-x-4 gap-y-2 !justify-end">
          <CustomButton title="Cancel" type="button" variant="outline" onClick={closeModal} />

          <CustomButton
            title={`${type === "edit" ? "Edit" : "Create"} Post`}
            type="submit"
            isLoading={isCreating || isEditing}
          />
        </div>
      }
    >
      <div className="relative flex-column gap-6">
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          name="channel"
          label="Select Channel"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          field={{
            value: values.channel,
            placeholder: "",
          }}
          onChange={(value: any) => {
            setFieldValue("channel", value);
          }}
          selectList={[]}
          selectTrigger={<></>}
        >
          {[]?.map((item, index) => (
            <SelectItem key={index} value={item} className="shad-select-item">
              {item}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="tagline"
          label="Post Tagline"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.tagline,
            placeholder: "",
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="media"
          label="Post Image"
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
          renderSkeleton={() => (
            <Dropzone name="media" onFileChange={(files: any) => setSelectedFiles(files)} />
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default PostForm;
