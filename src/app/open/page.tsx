"use client";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseCircleOutline, IoFileTrayStacked } from "react-icons/io5";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { TiArrowLeftThick } from "react-icons/ti";

const schema = z.object({
  email: z
    .string()
    .email("Coloque um E-mail válido para localizar")
    .min(1, "O campo E-mail e obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerInfoProps {
  id: string;
  name: string;
  userId: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerInfoProps | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleClearCustumer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchEmail(data: FormData) {
    const loading = toast.loading("Localizando cliente");

    if (!data.email) {
      return;
    }

    try {
      toast.dismiss(loading);

      const response = await api.get("/api/customer", {
        params: {
          email: data.email,
        },
      });

      setCustomer({
        id: response.data.id as string,
        name: response.data.name as string,
        userId: response.data.userId as string,
      });
      toast.success("Cliente localizado");
      return;
    } catch (error) {
      toast.dismiss(loading);
      setError("email", {
        type: "custom",
        message: "Ops!, Cliente não encontrado",
      });
      toast.error("Cliente não esta cadastrado");
      return;
    }
  }

  return (
    <Container>
      <main className="w-full h-full flex relative flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold mt-10">Abri chamado</h2>
        <section className="mt-5 w-full max-w-xl  px-2 md:px-10 py-5 boxStyle ">
          {customer ? (
            <div className="w-full flex items-center justify-between ">
              <div className="flex gap-1.5 flex-wrap">
                <strong>Cliente encontrato: </strong>
                <p className="capitalize">{customer.name}</p>
              </div>
              <button onClick={handleClearCustumer}>
                <IoCloseCircleOutline className="text-2xl text-red-600" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleSearchEmail)}
              className="flex flex-col gap-6  justify-center mx-auto "
            >
              <Input
                type="text"
                placeholder="Digite o E-mail do cliente"
                {...register("email")}
                name="email"
                error={errors.email?.message}
              />
              <Button type="submit">
                Procurar Cliente <FaSearch />
              </Button>
            </form>
          )}
        </section>
        {customer !== null && (
          <section className="mt-5 w-full max-w-xl  px-2 md:px-10 py-5 boxStyle ">
            <FormTicket customer={customer} />
          </section>
        )}
      </main>
      <Link
        href={"/"}
        className="rounded-full p-3 absolute bottom-5 right-5 bg-slate-700/35 hover:bg-blue-700/80 active:bg-blue-700/80 border-2 duration-200 hover:scale-105 active:scale-105 border-slate-800  drop-shadow drop-shadow-black/50 active:p-4 hover:p-4 active:border-4 hover:border-4 animate-pulse "
      >
        <TiArrowLeftThick className="text-4xl drop-shadow drop-shadow-black/50" />
      </Link>
    </Container>
  );
}
