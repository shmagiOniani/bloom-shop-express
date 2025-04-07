
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserMenu from "./UserMenu"; // Import the UserMenu component

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userMenu={<UserMenu />} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
