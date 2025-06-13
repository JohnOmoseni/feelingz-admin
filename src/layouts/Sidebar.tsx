import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { SidebarLinksProp } from "@/types";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { setActiveTab } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { Logo } from "@/constants/icons";

type SidebarProps = SidebarLinksProp;

const LinkRow = ({ href, icon: Icon, label, tag }: SidebarProps) => {
  const link = "group relative w-full row-flex-start leading-3 py-3.5 px-3.5 transition";
  const linkInner =
    "grid grid-cols-[max-content_auto] items-center text-secondary-foreground gap-2 font-semibold cursor-pointer group-hover:scale-105 transition-all transition-colors";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === href || pathname === `${href}/`;

  const handleNavigate = () => {
    dispatch(setActiveTab(tag));
    navigate(href);
  };

  return (
    <li title={tag} className={cn(link, isActive && "border-l-2 border-accent bg-[#222]")}>
      <div className={cn(linkInner)} onClick={() => handleNavigate()}>
        {Icon && <Icon className={cn("size-5", isActive && "fill-variant")} />}
        <span
          className={cn(
            "leading-6 font-normal tracking-wide ",
            isActive && "font-semibold text-accent"
          )}
        >
          {label}
        </span>
      </div>
    </li>
  );
};

function Sidebar() {
  const { user } = useAuth();

  return (
    <>
      <div className="row-flex mt-5 w-full overflow-hidden">
        <Logo className="w-[80] h-fit" />
      </div>
      <motion.div className="flex size-full pt-7 md:pt-12">
        <ul className="flex-column w-full gap-3">
          {sidebarLinks.map((link, idx) => {
            const isLinkAllowed =
              link?.showAlways || (user?.role && link.allowedRoles.includes(user.role));

            return (
              <React.Fragment key={idx}>
                {isLinkAllowed ? <LinkRow key={idx} {...link} idx={idx} /> : null}{" "}
              </React.Fragment>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
export default Sidebar;
