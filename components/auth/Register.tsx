"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import CustomInput from "../CutomInput";
import CustomButton from "../CustomButton";
import { RegisterLists } from "@/constants/auth";
import { RegisterSchema, RegisterType } from "@/Schema/auth";
import { useRegister } from "@/hooks/auth/useAuth";
import { z } from "zod";



const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    reset,
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

  const { mutate: register, isPending } = useRegister();

  const onSubmit = (data: RegisterType) => {
    register(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 lg:px-0 font-Primary">
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px] space-y-6">
        <h1 className="text-2xl font-bold">Register Page</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {RegisterLists?.map(({ name, type, placeholder, options }) => (
            <CustomInput
              key={name}
              name={name}
              type={type as any} 
              placeholder={placeholder}
              options={options}
              control={control}
            />
          ))}

          <CustomButton disabled={isPending}>
            {isPending ? "Loading..." : "Register"}
          </CustomButton>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
