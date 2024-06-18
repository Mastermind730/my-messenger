"use client";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import Input from "./Input";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<variant>("LOGIN");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
      // console.log("authenticated");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data);
        const result = await signIn("credentials", {
          redirect: false,
          ...data,
        });
        if (result?.error) {
          console.log("error occurred");
        } else {
          router.push("/users");
        }
      } catch {
        toast.error("Something went wrong!!");
      } finally {
        setLoading(false);
      }
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            router.push("/users");
            toast.success("Successfully logged in!");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(false);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white text-gray-900">
      <Image
        className="mx-auto mb-4"
        alt="logo_png"
        src="/images/logo.png"
        width={80}
        height={80}
      />
      <h2 className="font-bold text-3xl mb-4 text-center">
        {variant === "LOGIN" ? "Sign in to Messenger" : "Sign Up to Messenger"}
      </h2>
      <form
        className="flex flex-col w-full max-w-md justify-center items-center space-y-4 border border-gray-300 rounded-md p-8 bg-gray-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        {variant === "REGISTER" && (
          <Input label="Name" id="name" register={register} errors={errors} />
        )}
        <Input label="Email" id="email" register={register} errors={errors} />
        <Input
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => socialAction("google")}
          className="bg-red-600 hover:bg-red-500 w-[100px] flex items-center justify-center text-white font-bold py-2 px-3 rounded"
        >
          <FaGoogle />
        </button>
        <button
          onClick={() => socialAction("github")}
          className="bg-gray-900 hover:bg-gray-800 flex items-center justify-center w-[100px] text-white font-bold py-2 px-4 rounded"
        >
          <FaGithub />
        </button>
      </div>
      <p className="mt-4 cursor-pointer" onClick={toggleVariant}>
        {variant === "LOGIN"
          ? "New to account? Sign up here"
          : "Already have an account? Sign in here"}
      </p>
    </div>
  );
};

export default AuthForm;
