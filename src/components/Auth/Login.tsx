import Link from "next/link";
import GoogleAuth from "./GoogleAuth";
import LoginForm from "./LoginForm";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  
  const session = authClient.getSession();
  console.log(session);
  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Login to your account</p>
      </div>

      <GoogleAuth />

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* login form */}
      <LoginForm />

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <Link href="/auth/register" className="font-medium underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
