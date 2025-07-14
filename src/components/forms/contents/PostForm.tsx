import { useFormik } from "formik";
import { SelectItem } from "@/components/ui/select";
import { useCreateArticle, useEditArticle } from "@/server/actions/contents/useArticles";
import { useState } from "react";
import { useGetAllChannels } from "@/server/actions/contents/useContent";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";
import FormWrapper from "@/components/forms/FormWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import Dropzone from "../Dropzone";
import FallbackLoader from "@/components/fallback/FallbackLoader";

type PostFormProps = {
  type?: "create" | "edit";
  article?: ArticleResponse;
  closeModal: () => void;
};

const PostForm = ({ type = "create", article, closeModal }: PostFormProps) => {
  const { mutateAsync: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutateAsync: editArticle, isPending: isEditing } = useEditArticle();
  const [_selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const {
    data: channels,
    isLoading: isFetchingChannels,
    isError: isFetchingChannelsError,
  } = useGetAllChannels();

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("channel_id", values.channel);
    formData.append("caption", values.caption);
    formData.append("content", values.content);
    formData.append("status", "published");

    if (_selectedFiles) {
      for (let i = 0; i < _selectedFiles.length; i++) {
        formData.append("image", _selectedFiles[i]);
      }
    }

    try {
      if (type === "edit" && article) {
        await editArticle({ article_id: article?.id, formData });
      } else {
        await createArticle(formData);
      }

      closeModal();
    } catch (error: any) {}
  };

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        channel:
          article?.id && channels
            ? String(
                channels.find(
                  (channel: ChannelResponse) => String(channel.id) === String(article.channel_id)
                )?.id || ""
              )
            : undefined,
        title: article?.title || "",
        caption: article?.caption || "",
        content: article?.content || "",
        image: article?.image || null,
      },
      validationSchema: "",
      onSubmit,
    });

  console.log("ARTICLE", article, values);

  return (
    <FormWrapper
      containerStyles="max-w-full"
      onSubmit={handleSubmit}
      footerSection={
        <div className="flex flex-col-reverse min-[500px]:row-flex gap-x-4 gap-y-2 !justify-end">
          <CustomButton
            title="Cancel"
            type="button"
            variant="outline"
            className="w-full"
            onClick={closeModal}
          />

          <CustomButton
            title={`${type === "edit" ? "Edit" : "Create"} Post`}
            type="submit"
            className="w-full"
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
          }}
          onChange={(value: any) => {
            setFieldValue("channel", value);
          }}
          selectList={channels}
        >
          {isFetchingChannels ? (
            <div className="loader-container !h-[100px]">
              <FallbackLoader />
            </div>
          ) : isFetchingChannelsError ? (
            <SelectItem disabled={true} value="no-option" className="">
              Something went wrong
            </SelectItem>
          ) : (
            channels?.map((item, index) => (
              <SelectItem key={index} value={String(item.id)} className="shad-select-item">
                {item.name}
              </SelectItem>
            ))
          )}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="title"
          label="Title"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.title,
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="caption"
          label="Read More Caption (Max 260 characters)"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.caption,
            maxLength: 260,
          }}
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          name="content"
          label="Full Post Content"
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          field={{
            value: values.content,
          }}
        />

        {/* <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="content"
          label="Full Post Content"
          renderSkeleton={() => (
            <TextEditor
              value={values.content}
              onChange={(content: string) => {
                setFieldValue("content", content);
              }}
            />
          )}
        /> */}

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          name="image"
          label="Post Image"
          errors={errors}
          onBlur={handleBlur}
          touched={touched}
          renderSkeleton={() => (
            <Dropzone
              name="image"
              onFileChange={(files: FileList) => {
                setFieldValue("image", files?.[0]);
                setSelectedFiles(files);
              }}
            />
          )}
        />
      </div>
    </FormWrapper>
  );
};

export default PostForm;
