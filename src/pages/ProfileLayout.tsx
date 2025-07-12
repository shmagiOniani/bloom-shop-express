import ProfileSidebar from "@/components/ProfileSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProfileLayout = () => {
  const { t } = useLanguage();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{
    label: string;
    path: string;
  }>>([]);

  useEffect(() => {
    const newBreadcrumbs = pathname.split("/").filter(Boolean).map((segment, index, array) => ({
      label: segment,
      path: array.slice(1, index + 1).join("/")
    }));
    if(newBreadcrumbs.map(breadcrumb => breadcrumb.label).includes("edit")) {
      newBreadcrumbs.pop();
    }
    setBreadcrumbs(newBreadcrumbs);
  }, [pathname]);


  return (
    <div className="bloom-container py-12">
      <div className="grid md:grid-cols-8 gap-8">
        <div className="md:col-span-2">
          <ProfileSidebar />
        </div>
        <div className="md:col-span-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-bloom-pink flex items-center">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={breadcrumb.path}>
                <ChevronRight className="h-4 w-4" />
                <span className={` transition-colors ${index !== breadcrumbs.length - 1 ? "text-bloom-yellow hover:text-bloom-pink cursor-pointer" : "text-bloom-pink"}`} onClick={() => navigate(breadcrumb.path)}> {t(`profile.${breadcrumb.label}`)}</span>
              </Fragment>
            ))}
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
