import { Toaster } from "@/components/ui/toaster";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div className="flex items-center justify-between sm:mx-auto vsm:mx-auto">
          <section className="h-screen xl:w-1/2 w-full flex justify-center items-center">
            <Outlet />
          </section>
          <img
            src="/assets/images/Features.png"
            alt="logo"
            className="hidden xl:block h-screen xl:w-1/2 object-contain bg-no-repeat"
          />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default AuthLayout;
