"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { CustomerInfoProps } from "../../page";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z
    .string("Crie um Titulo para chamado")
    .min(1, "Campo nome e obrigátorio"),
  description: z
    .string("Descreva o problema de forma clara e objetiva")
    .min(5, "Campo de descrição e obrigátorio"),
});

type FormData = z.infer<typeof schema>;

export function FormTicket({ customer }: { customer: CustomerInfoProps }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function handleRegisterTicket(data: FormData) {
    if (!data) {
      setError("name", { type: "custom", message: "Campo name esta faltando" });
      setError("description", {
        type: "custom",
        message: "Campo descrição esta faltando",
      });
      return;
    }

    try {
      await api.post("/api/ticket", {
        id: customer.id,
        name: data.name,
        description: data.description,
        userId: customer.userId,
      });

      setValue("name", "");
      setValue("description", "");

      setTimeout(() => {
        redirect("/open/status");
      }, 1000);
    } catch (error) {
      console.log("falid register ticket");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterTicket)}
      className="flex flex-col gap-2  w-full"
    >
      <Input
        label="Nome do chamado"
        type="text"
        placeholder="Digite um titulo para chamado"
        {...register("name")}
        error={errors.name?.message}
      />
      <div className="w-full flex flex-col gap-0.5">
        <label className="text-sm font-bold">Descreva o problema</label>
        <textarea
          placeholder="Descreva o problema..."
          id="description"
          {...register("description")}
          className="inputStyle resize-none h-30 w-full "
        ></textarea>

        {errors.description?.message && (
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        )}
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
