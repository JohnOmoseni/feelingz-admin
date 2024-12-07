import { ReactNode } from "react";
import { ArrowRight, KeyboardArrowDown, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { DropdownList } from "@/components/ui/components/DropdownList";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { LogOut } from "lucide-react";

import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib";

function Header({ title, customContent }: { title?: string; customContent?: ReactNode }) {
  const dispatch = useDispatch();
  const { activeTab } = useAppSelector((state) => state.appState);
  const { handleLogout, isLoadingAuth, user } = useAuth();

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <div className="flex-column sticky top-0 bg-background shadow-sm z-[50] min-h-[60px] w-full justify-center border-b border-border-100">
      <div className="row-flex-btwn gap-6 border-b border-border-100 py-3 px-4 sm:px-5">
        <h2 className="capitalize text-xl sm:text-2xl">{title || "Dashboard"}</h2>

        <div className="row-flex gap-3">
          <div className="sm:row-flex gap-2 hidden">
            <Link to="/dashboard/settings" className="">
              <AvatarWrapper
                containerClassName="max-sm:order-2"
                fallback={getInitials(user?.name!)}
              />
            </Link>

            <DropdownList
              trigger={
                <div className="row-flex-btwn gap-1">
                  <p className="w-full break-words text-base font-semibold leading-4">
                    {user?.name || "Unknown"}
                  </p>

                  <KeyboardArrowDown className="size-4" />
                </div>
              }
              containerStyles="min-w-[6rem]"
              list={["Log out"]}
              renderItem={(item) => {
                return (
                  <div className="row-flex-btwn w-full cursor-pointer gap-3" onClick={onLogout}>
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
      </div>

      <div className={cn("gap-6 py-2.5 sm:px-5 px-4", customContent ? "row-flex-btwn" : "hidden")}>
        <h3 className="capitalize hidden sm:block">{activeTab}</h3>

        <div className="ml-auto">{customContent && customContent}</div>
      </div>
    </div>
  );
}

export default Header;

// @ts-ignore
const Notification = () => (
  <div className="flex-column gap-3 px-1.5">
    <div className="row-flex-btwn gap-4">
      <h3 className="font-semibold text-[1.05rem]">Notifications</h3>

      <span className="text-sm text-secondary cursor-pointer font-semibold active:scale-95 transition">
        Mark all as read
      </span>
    </div>

    <ul className="px-0.5 mt-4 mb-2 not-first-of-type:border-t">
      <li className="grid grid-cols-[max-content_1fr] gap-3 py-2">
        <span className="size-3 mt-1 bg-grey-200 rounded-full clip-circle" />

        <div className="flex-column pr-1">
          <h4 className="font-semibold"> Commission received</h4>
          <p className="grey-text !font-light line-clamp-2 break-all">
            A driver just paid you 10% commission
          </p>
          <span className="text-[0.7rem] mt-1 text-grey-200 tracking-wide">
            03:40pm - 23 Sept, 2024
          </span>
        </div>
      </li>
    </ul>

    <div className="cursor-pointer transition active:scale-95 text-base row-flex pt-3 px-4 mt-auto text-secondary font-semibold">
      View More
      <ArrowRight className="size-4 ml-1" />
    </div>
  </div>
);
