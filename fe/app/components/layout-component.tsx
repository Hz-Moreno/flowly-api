import Sidebar from "~/components/sidebar-component";
import Nav from "~/components/nav-component";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen">
      <Sidebar />
      <div>
        <Nav />
        <main className="p-6 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
