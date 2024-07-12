import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div className="flex items-center justify-between">
          <section className="h-screen lg:w-full xl:w-1/2 sm:w-full flex justify-center items-center">
            <Outlet />
          </section>
            <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen xl:w-1/2 object-cover bg-no-repeat"
          />
          
        </div>
      )}
    </>
  );
};

export default AuthLayout;
