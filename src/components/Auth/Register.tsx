import GoogleAuth from "./GoogleAuth";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up with email or Google
          </p>
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

        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;
