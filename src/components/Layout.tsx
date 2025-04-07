
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = () => {
  // Add a playful cursor effect on page load
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
    <div className="flex flex-col min-h-screen bg-bloom-beige bg-opacity-30">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Decorative elements for playfulness */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-bloom-light-pink opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 -left-16 w-48 h-48 rounded-full bg-bloom-light-green opacity-20"></div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
