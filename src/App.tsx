import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import {
  AllUsers,
  CreatePost,
  EditPost,
  // Explore,
  Home,
  // PostDetails,
  // Profile,
  // Saved,
  // UpdateProfile,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SigninForm />} />
        <Route path="sign-up" element={<SignupForm />} />
      </Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} /> */}
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:id" element={<EditPost />} />
        {/* <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile/:id/*" element={<Profile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
