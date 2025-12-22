import { House } from "lucide-react";
import SideBarNavItem from "~/components/side-link-item-component";

const Sidebar = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col w-full items-center gap-4 p-2">
        <SideBarNavItem link="/dashboard">
          {/*<House />*/}
          Home
        </SideBarNavItem>
        <SideBarNavItem link="/dashboard/settings">Settings</SideBarNavItem>
      </div>
    </>
  );
};

export default Sidebar;
