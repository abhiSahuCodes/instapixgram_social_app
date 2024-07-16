import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  let publicRoutes = [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SigninForm />,
        },
        {
          path: "sign-up",
          element: <SignupForm />,
        },
      ],
    },
  ];

  let protectedRoutes = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
  return (
    <>
      <main className="flex h-screen">
        <RouterProvider router={router} />
        <Toaster />
      </main>
    </>
  );
};

export default App;
