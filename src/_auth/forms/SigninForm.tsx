import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useSignInAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount} =
    useSignInAccount();

  // Defining form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      toast({ title: "You are already logged in." });
      navigate("/");
      return;
    }
  
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });
  
      if (!session) {
        toast({ title: "Something went wrong. Please login your new account" });
        navigate("/sign-in");
        return;
      }
  
      const isUserLoggedIn = await checkAuthUser();
  
      if (isUserLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });
      }
    } catch (error) {
      toast({ title: "An error occurred during sign-in. Please try again." });
      console.error("Sign-in error:", error);
    }
  }
  return (
    <div className="flex-center flex-col">
      <Form {...form}>
        <div className="sm:w-[320px] flex-start flex-col">
          <img src="/assets/images/logo.png" alt="" className="w-[220px]" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log into account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back, enter your details
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SigninForm;
