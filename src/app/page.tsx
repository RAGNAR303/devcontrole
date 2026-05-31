"use client";

import Image from "next/image";
import banner from "../../public/image.png";
import { Button } from "@/components/button";
import { useContext } from "react";
import { LoginContext } from "@/providers/login";
import Link from "next/link";
import { IoFileTrayStacked } from "react-icons/io5";

export default function Home() {
  const { handleSignIn, handleSignOut, status, data } =
    useContext(LoginContext);

  return (
    <main className="flex justify-center relative items-center flex-col md:flex-row w-full gap-1 md:gap-20 min-h-[calc(100dvh-(--spacing(12.5)))]  text-center">
      <section className="flex items-center flex-col justify-center flex-4  max-w-xs  md:max-w-xl  gap-2 p-1 md:p-4">
        <Image
          src={banner}
          alt="banner"
          width={400}
          className="w-9/10 max-w-xs md:max-w-xl "
          loading="eager"
        />
      </section>

      <section className="flex flex-col gap-2 px-6 py-3 md:py-9  items-center  justify-center flex-1 w-full  md:max-w-xs  h-full max-h-100 rounded-t-2xl   md:rounded boxStyle  ">
        <div>
          <h1 className="font-extralight text-xl md:text-2xl">
            Gerencie sua Empresa
          </h1>
          <strong className="text-blue-800 text-xl md:text-3xl ">
            Atendimento , Clientes
          </strong>
        </div>

        {data && (
          <div className="my-4">
            <p>Seja bem vindo!</p>
            <strong className="text-2xl">{data.user.name}</strong>
          </div>
        )}

        {status === "loading" && (
          <Button
            disabled
            className="disabled:bg-slate-700 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <p className="animate-pulse w-40">Entrando...</p>
          </Button>
        )}
        {status === "unauthenticated" && (
          <Button onClick={handleSignIn}>
            <p className="w-40">acessar</p>
          </Button>
        )}
        {status === "authenticated" && (
          <div className="flex flex-col gap-2">
            <Link href={"/dashboard"}>
              <Button>
                <p className="w-40">Ver chamados</p>
              </Button>
            </Link>
            <Button onClick={handleSignOut} variant="cancel">
              <p className="w-40">Sair</p>
            </Button>
          </div>
        )}
      </section>
      <Link
        href={"/open"}
        className="rounded-full p-3 absolute bottom-5 right-5 bg-slate-700/35 hover:bg-blue-700/80 active:bg-blue-700/80 border-2 duration-200 hover:scale-105 active:scale-105 border-slate-800  drop-shadow drop-shadow-black/50 active:p-4 hover:p-4 active:border-4 hover:border-4 animate-pulse "
      >
        <IoFileTrayStacked className="text-4xl drop-shadow drop-shadow-black/50" />
      </Link>
    </main>
  );
}
