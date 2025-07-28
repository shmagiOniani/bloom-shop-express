import { useLanguage } from "@/context/LanguageContext";
import { Home, HousePlus, Package, Settings, Store,PackagePlus } from "lucide-react";
import { NavLink } from "react-router-dom";


const navItems = [
  { to: "/profile", label: "profile.overview" , icon: <Home className="h-4 w-4" />},
  { to: "/profile/add-product", label: "profile.addProduct" , icon: <PackagePlus className="h-4 w-4" />},
  { to: "/profile/products", label: "profile.products" , icon: <Package className="h-4 w-4" />},
  { to: "/profile/add-store", label: "profile.addStore" , icon: <HousePlus className="h-4 w-4" />},
  { to: "/profile/stores", label: "profile.stores" , icon: <Store className="h-4 w-4" />},
  { to: "/profile/settings", label: "profile.settings" , icon: <Settings className="h-4 w-4" />},
  { to: "/profile/system-parameters", label: "profile.systemParameters" , icon: <Settings className="h-4 w-4" />},
];

const ProfileSidebar = () => {
  const { t } = useLanguage();
  return (
  <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4 space-y-2">
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/profile"}
          className={({ isActive }) =>
            `whitespace-nowrap px-4 py-2 rounded transition-colors text-[#7c7f85] flex items-center gap-2 ${
              isActive ? "bg-bloom-yellow text-[#7c7f85] font-semibold" : "hover:bg-bloom-light-pink text-gray-700"
            }`
          }
        >
          {item.icon} 
          {t(item.label)}
        </NavLink>
      ))}
    </nav>
    </aside>
  );
};

export default ProfileSidebar; 