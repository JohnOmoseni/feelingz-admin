import { motion } from "framer-motion";
import { sidebarLinks } from "@/constants";
import { Close } from "@/constants/icons";
import { useAppDispatch, useAppSelector } from "@/types";
import { setOpenMenu } from "@/redux/features/appSlice";
import { animateFn, revealMenu, slideinVariant } from "@/lib/animate";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import NavLinks from "@/layouts/NavLinks";

function Menu() {
	const { role } = useAuth();

	const dispatch = useAppDispatch();
	const { openMenu } = useAppSelector((state) => state.appState);

	useEffect(() => {
		if (openMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openMenu]);

	return (
		<motion.div
			style={{ zIndex: 9999 }}
			className="fixed inset-0 block h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm md:hidden"
			{...animateFn(revealMenu)}
			onClick={() => dispatch(setOpenMenu(false))}
		>
			<motion.div
				{...animateFn(slideinVariant)}
				className="menu remove-scrollbar flex-column fixed right-0 top-0 isolate h-dvh w-[70%] max-w-[400px] overflow-y-auto bg-background px-[3%] pb-6 pt-4 backdrop-blur-sm"
				onClick={(e) => e.stopPropagation()}
			>
				<span
					className="icon absolute right-3.5 top-2.5 p-1 transition-colors active:scale-95"
					onClick={() => dispatch(setOpenMenu(false))}
					title="close-menu"
				>
					<Close size="24" className="cursor-pointer text-foreground" />
				</span>

				<nav className="flex-1 pl-[4%] pt-[max(5rem,_22%)]">
					<ul className="flex-column gap-8 overflow-y-auto text-lg">
						{sidebarLinks.map((link, idx) =>
							link.allowedRoles.includes(role!) ? (
								<NavLinks key={idx} {...link} idx={idx} />
							) : null
						)}
					</ul>
				</nav>
			</motion.div>
		</motion.div>
	);
}

export default Menu;
