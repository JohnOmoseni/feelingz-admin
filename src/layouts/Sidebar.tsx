import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { SidebarLinksProp } from "@/types";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { setActiveTab } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { logo } from "@/constants/icons";

type SidebarProps = SidebarLinksProp;

const LinkRow = ({ href, icon: Icon, label, tag }: SidebarProps) => {
  const link =
    "group relative w-full row-flex-start leading-3 p-2.5 bg-secondary rounded-md whitespace-nowrap transition-all";
  const linkInner =
    "grid grid-cols-[max-content_auto] items-center w-full gap-1.5 font-semibold transition-all";
  const activeLink = cn("text-secondary-foreground font-semibold");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === href || pathname === `${href}/`;

  const handleNavigate = () => {
    dispatch(setActiveTab(tag));
    navigate(href);
  };

  return (
    <li title={tag} className={cn(link, isActive && "brightness-[1.15]")}>
      <div
        className={cn(linkInner, "cursor-pointer group-hover:scale-105")}
        onClick={() => handleNavigate()}
      >
        {Icon && <Icon className={cn("size-5", isActive && "size-5")} />}
        <span
          className={cn(
            "text-[1rem] font-normal text-gray-200 tracking-wide",
            isActive && activeLink
          )}
        >
          {label}
        </span>
      </div>
    </li>
  );
};

function Sidebar() {
  const { role } = useAuth();

  return (
    <>
      <div className="row-flex mt-2 w-full overflow-hidden">
        <img src={logo} className="w-fit h-24" />
      </div>
      <motion.div className="flex size-full pt-7 px-4">
        <ul className="flex-column w-full gap-3">
          {sidebarLinks.map((link, idx) => {
            const isLinkAllowed = link?.showAlways || (role && link.allowedRoles.includes(role));

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
