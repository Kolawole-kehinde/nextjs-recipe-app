"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../hooks/useLogin";
import Link from "next/link";
import CustomButton from "../CustomButton";
import CustomInput from "../CutomInput";
import { LoginLists } from "@/constants/auth";
import { LoginSchema, LoginType } from "@/Schema/auth";

const LoginPage = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginType) => {
    login(data, {
      onSuccess: (res) => {
        toast.success("User logged in successfully!");
        setUser(res?.user);
        reset();
        router.push("/dashboard");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.loginError || "Login failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-Primary px-4 lg:px-0">
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px] space-y-5">
        <h1 className="text-2xl font-semibold">Login Page</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {LoginLists?.map(({ name, type, placeholder }) => (
            <div key={name} className="relative">
              <CustomInput
                name={name}
                type={type}
                placeholder={placeholder}
                control={control}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
              />
            </div>
          ))}

          <p className="text-sm text-right">
            <Link
              href="/auth/forget-password"
              className="text-primary text-base hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          <CustomButton disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </CustomButton>
        </form>

        <p className="text-center mt-4 text-sm">
          Don&#39;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
