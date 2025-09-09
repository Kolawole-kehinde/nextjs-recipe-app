"use client";
import { RegisterLists } from "@/constants/auth";
import CustomInput from "../CutomInput";
import CustomButton from "../CustomButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterType } from "@/Schema/auth";
import { useRegister } from "@/hooks/useRegister";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isLoading } = useRegister();

  const onSubmit = (data: RegisterType) => {
    register(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Registration failed");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 lg:px-0 font-Primary">
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px] space-y-6">
        <h1 className="text-2xl font-bold">Register Page</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {RegisterLists?.map(({ name, type, placeholder, options }) => (
            <div key={name}>
              <CustomInput
                name={name}
                type={type}
                placeholder={placeholder}
                options={options}
                control={control}
              />
            </div>
          ))}

          <CustomButton disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </CustomButton>
        </form>

        
                <p className="text-center mt-4 text-sm">
                  Don&#39;t have an account?{" "}
                  <Link href="/login" className="text-primary">
                    Login
                  </Link>
                </p>
      </div>
    </div>
  );
};

export default RegisterPage;
