
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserMenu from "./UserMenu";
import PlayfulCursor from "./PlayfulCursor";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PlayfulCursor />
      <Header userMenu={<UserMenu />} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
