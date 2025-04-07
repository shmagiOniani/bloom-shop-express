
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = () => {
  // Add a playful cursor effect on page load
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'hidden md:flex fixed items-center justify-center w-10 h-10 pointer-events-none z-50 mix-blend-difference';
    cursor.style.background = 'rgba(248, 187, 204, 0.3)'; // Bloom pink with transparency
    cursor.innerHTML = '🌸'; // Flower emoji
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 16}px`;
      cursor.style.top = `${e.clientY - 16}px`;
      
      // Add a playful bounce effect on click
      if (e.type === 'click') {
        cursor.animate([
          { transform: 'scale(1)', opacity: 0.6 },
          { transform: 'scale(1.5)', opacity: 1 },
          { transform: 'scale(1)', opacity: 0.6 }
        ], {
          duration: 500,
          iterations: 1
        });
        
        // Create a little spark/flower that floats up and fades on click
        const spark = document.createElement('div');
        spark.className = 'fixed pointer-events-none z-40 text-xl';
        spark.textContent = '✨';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        document.body.appendChild(spark);
        
        spark.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: 'translateY(-100px) rotate(360deg)', opacity: 0 }
        ], {
          duration: 1000,
          iterations: 1
        });
        
        setTimeout(() => {
          document.body.removeChild(spark);
        }, 1000);
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-bloom-beige bg-opacity-30">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Decorative elements for playfulness */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-bloom-light-pink opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-16 w-48 h-48 rounded-full bg-bloom-light-green opacity-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-40 right-10 w-24 h-24 rounded-full bg-bloom-light-pink opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
