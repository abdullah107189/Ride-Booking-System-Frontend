/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { loginSchema, type LoginFormValues } from "./login.schema";
import { Link, useNavigate } from "react-router";
import loginImage from "@/assets/Journey-cuate.png";
import PasswordInput from "@/components/passwordInput";
import Logo from "@/components/shared/Logo";
import { useState } from "react";
import { Mail, LogIn, Copy, Check, X } from "lucide-react";
// Test credentials
const TEST_CREDENTIALS = [
  { role: "Admin", email: "admin@gmail.com", password: "asdfAa!1" },
  { role: "Rider", email: "rider@gmail.com", password: "asdfAa!1" },
  { role: "Driver", email: "driver@gmail.com", password: "asdfAa!1" },
];

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isQuickLoginOpen, setIsQuickLoginOpen] = useState(false); // New state for modal
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // API call
      await login(data).unwrap();
      navigate("/");
      toast.success("Login successful! 🎉", {
        description: `Welcome back!`,
      });
      form.reset();
    } catch (error) {
      const errorAsAny = error as any;
      toast.error(errorAsAny?.data?.message || "Login failed");
    }
  };

  const handleQuickLogin = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
    toast.info("Credentials filled!", {
      description: "Click Sign In to login",
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo></Logo>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            className="pl-10 bg-background border-input transition-all focus:border-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PasswordInput {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-[hsl(240,83%,65%)] hover:opacity-90 transition-all shadow-lg hover:shadow-xl font-semibold text-primary-foreground"
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Quick Login Section */}
                <div className="border-t pt-6 mt-6">
                  <div className="text-center mb-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsQuickLoginOpen(true)}
                      className="w-full border-primary text-primary hover:bg-primary transition-all"
                    >
                      🚀 Quick Test Login
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      For testing purposes only
                    </p>
                  </div>
                </div>

                {/* Quick Login Modal */}
                {isQuickLoginOpen && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card rounded-lg max-w-md w-full p-6 animate-in fade-in-90 zoom-in-90">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Quick Test Login</h2>
                        <button
                          onClick={() => setIsQuickLoginOpen(false)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="mb-4 text-sm">
                        Choose a role to automatically fill credentials
                      </p>

                      {/* Credentials List */}
                      <div className="space-y-3">
                        {TEST_CREDENTIALS.map((cred, index) => (
                          <div
                            key={cred.role}
                            className="border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                                {cred.role}
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                  handleQuickLogin(cred.email, cred.password);
                                  setIsQuickLoginOpen(false);
                                }}
                                className="h-7 text-xs bg-primary hover:bg-primary/90"
                              >
                                Use This
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {/* Email with copy */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-12">
                                  Email:
                                </span>
                                <code className="flex-1 text-xs bg-background px-2 py-1 rounded border">
                                  {cred.email}
                                </code>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    copyToClipboard(
                                      cred.email,
                                      `email-${index}`
                                    )
                                  }
                                >
                                  {copiedField === `email-${index}` ? (
                                    <Check className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>

                              {/* Password with copy */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-12">
                                  Pass:
                                </span>
                                <code className="flex-1 text-xs bg-background px-2 py-1 rounded border">
                                  {cred.password}
                                </code>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    copyToClipboard(
                                      cred.password,
                                      `password-${index}`
                                    )
                                  }
                                >
                                  {copiedField === `password-${index}` ? (
                                    <Check className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Close Button */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsQuickLoginOpen(false)}
                        className="w-full mt-4"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                {/* <Button variant="outline" type="button" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button> */}

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Ready to Ride?</h2>
            <p className="text-xl opacity-90">
              Join thousands of riders and drivers in our community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
