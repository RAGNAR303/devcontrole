"use client";

import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiSolidLockAlt } from "react-icons/bi";
import Image from "next/image";
import { TbLoader } from "react-icons/tb";
import { toast } from "sonner";
import { useContext } from "react";
import { LoginContext } from "@/providers/login";
export function Header() {
  const { handleSignIn, handleSignOut, data, status } =
    useContext(LoginContext);

  return (
    <header className="boxStyle w-full  z-60 fixed top-0 right-0">
      <nav className="flex items-center  justify-between max-w-5xl w-full mx-auto px-6 py-2 ">
        <Link href={"/dashboard"}>
          <h2 className="font-extrabold text-xl hover:tracking-wide duration-300 ">
            <span className="text-blue-700/50 ">DEV</span>CONTROLE
          </h2>
        </Link>

        {status === "loading" && (
          <div>
            <TbLoader className="text-2xl md:text-3xl animate-spin" />
          </div>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleSignIn} className="text-2xl md:text-3xl">
            <BiSolidLockAlt />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-1 md:text-2xl ">
            {data ? (
              <Link href={"#"} className="relative  ">
                <Image
                  alt={data.user.name as string}
                  src={data.user.image as string}
                  width={30}
                  height={30}
                  className="rounded-full peer drop-shadow drop-shadow-black/20"
                />
                <div className=" absolute z-99 right-8 p-3 d text-sm opacity-0 hidden peer-hover:opacity-100 peer-active:opacity-100  peer-hover:flex peer-active:flex flex-col duration-200 border-l-4 border-blue-700/50 boxStyle backdrop-blur-3xl peer-hover:bg-slate-700 transition-all">
                  <p>{data.user.name}</p>
                  <strong>{data.user.email}</strong>
                </div>
              </Link>
            ) : (
              <Link href={"#"}>
                <FaUserCog />
              </Link>
            )}

            <button className="text-2xl md:text-3xl " onClick={handleSignOut}>
              <HiOutlineLogout className="text-red-400 active:text-red-600 hover:text-red-600 duration-200 hover:scale-95 active:scale-95 " />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
