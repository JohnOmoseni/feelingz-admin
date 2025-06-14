import { KeyboardArrowDown, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import CustomAvatars from "@/components/reuseables/CustomAvatars";

function Header({
  title,
  customHeaderContent,
}: {
  title: string;
  customHeaderContent?: ReactNode;
}) {
  const { handleLogout, isLoadingAuth, user } = useAuth();
  const dispatch = useDispatch();

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <header className="sticky top-0 bg-background shadow-sm z-[98] min-h-[55px] w-full">
      <div className="row-flex-btwn gap-6 border-b border-border-100 py-3 px-4 md:px-5 md:py-4">
        <h2 className="capitalize text-xl sm:text-2xl">{title}</h2>

        {customHeaderContent ? (
          customHeaderContent
        ) : (
          <div className="row-flex gap-3">
            <div className="row-flex gap-2">
              <CustomAvatars seed={user?.first_name || "Admin"} variant="initials" className="" />

              <DropdownList
                trigger={
                  <div className="row-flex-btwn gap-1">
                    <p className="w-full break-words text-base font-semibold max-sm:max-w-[10ch] leading-4">
                      {user?.first_name || "Admin"}
                    </p>

                    <KeyboardArrowDown className="size-4" />
                  </div>
                }
                containerStyles="min-w-[10rem] mt-18 header-dropdown"
                list={["Log out"]}
                renderItem={(item) => {
                  return (
                    <div
                      className="row-flex-btwn w-full cursor-pointer gap-3 transition hover:text-secondary-foreground"
                      onClick={onLogout}
                    >
                      <span className="text-base">{isLoadingAuth ? "Signing out" : item}</span>

                      {isLoadingAuth ? (
                        <BtnLoader isLoading={isLoadingAuth} />
                      ) : (
                        <LogOut className="h-fit w-4" />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div
              className="row-flex group cursor-pointer md:hidden"
              onClick={() => dispatch(setOpenMenu(true))}
            >
              <Menu className="size-6 transition-all group-hover:scale-95" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
