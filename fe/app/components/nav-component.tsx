import { CircleUser } from "lucide-react";

const Nav = () => {
  return (
    <nav className="w-full bg-gray-100 p-4">
      <ul className="flex flex-row gap-2">
        <li>
          <CircleUser />
        </li>
        <li>
          <CircleUser />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
