import ProfileForm from "@/components/forms/ProfileForm";
import SectionWrapper from "@/layouts/SectionWrapper";
import ProfilePic from "./profile-pic";
import { useAuth } from "@/context/AuthContext";

function Settings() {
  const { user } = useAuth();

  return (
    <>
      <SectionWrapper headerTitle={"Settings"}>
        <div className="flex-column min-[950px]:grid grid-cols-[1fr_minmax(200px,_300px)] gap-7">
          <div className="flex-column card !px-0">
            <h3 className="border-b pb-3 border-border px-4">Personal Information</h3>

            <ProfileForm data={user} />
          </div>

          <div className="flex-column w-full gap-3 card self-start !px-0">
            <h3 className="border-b pb-3 border-border px-4">Your Photo</h3>

            <ProfilePic userImage={user?.image!} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

export default Settings;
