"use client";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
const schema = z.object({
  email: z
    .string()
    .email("Coloque um E-mail válido para localizar")
    .min(1, "O campo E-mail e obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerInfoProps {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerInfoProps | null>({
    id: "464684646848646",
    name: "Matheus",
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleClearCustumer() {
    setCustomer(null);
    setValue("email", "");
  }

  return (
    <Container>
      <main className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold mt-10">Abri chamado</h2>
        <section className="mt-5 w-full max-w-xl bg-slate-700/30 px-2 md:px-10 py-5 rounded">
          {customer ? (
            <div className="w-full flex items-center justify-between ">
              <div className="flex gap-1.5 flex-wrap">
                <strong>Cliente encontrato: </strong>
                <p>{customer.name}</p>
              </div>
              <button onClick={handleClearCustumer}>
                <IoCloseCircleOutline className="text-2xl text-red-600" />
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-6  justify-center   mx-auto ">
              <Input
                type="text"
                placeholder="Digite o E-mail do cliente"
                register={register}
                name="email"
                error={errors.email?.message}
              />
              <Button>
                Procurar Cliente <FaSearch />
              </Button>
            </form>
          )}
        </section>
        {customer !== null && (
          <section className="mt-5 w-full max-w-xl bg-slate-700/30 px-2 md:px-10 py-5 rounded">
            <FormTicket />
          </section>
        )}
      </main>
    </Container>
  );
}
