
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import UserMenu from "./UserMenu"; // Import the UserMenu component

const Layout = () => {

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'hidden md:block fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference';
    cursor.style.background = 'rgba(248, 187, 204, 0.6)'; // Bloom pink with transparency
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 12}px`;
      cursor.style.top = `${e.clientY - 12}px`;
      cursor.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1)' }
      ], {
        duration: 500,
        iterations: 1
      });
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header userMenu={<UserMenu />} />
      <main className="flex-grow bg-bloom-beige">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
