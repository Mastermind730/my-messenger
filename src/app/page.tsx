import Image from "next/image";
import AuthForm from "./components/AuthForm";
export default function Home() {
  return (
    <div className="flex w-full h-full align-center justify-center flex-col px-10 ">
      <AuthForm />

    </div>
  );
}
