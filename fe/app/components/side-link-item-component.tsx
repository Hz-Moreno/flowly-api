import React from "react";
import { NavLink } from "react-router";

type SideBarNavItemProps = {
  link: React.ReactNode;
  children: React.ReactNode;
};

const defaultclasses = "p-2 rounded-lg  w-5/6";

const SideBarNavItem = ({ link, children }: SideBarNavItemProps) => {
  return (
    <NavLink
      className={({ isActive, isPending, isTransitioning }) =>
        [
          defaultclasses,
          isPending ? "" : "",
          isActive ? "bg-(--purple) text-white" : "",
          // isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
      to={link}
    >
      {children}
    </NavLink>
  );
};

export default SideBarNavItem;
