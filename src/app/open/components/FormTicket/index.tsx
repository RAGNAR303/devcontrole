"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

const schema = z.object({
  name: z
    .string("Crie um Titulo para chamado")
    .min(1, "Campo nome e obrigátorio"),
  description: z
    .string("Descreva o problema de forma clara e objetiva")
    .min(20, "Campo de descrição e obrigátorio"),
});

type FormData = z.infer<typeof schema>;

export function FormTicket() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form action="" className="flex flex-col gap-2  w-full">
      <Input
        label="Nome do chamado"
        type="text"
        name="name"
        placeholder="Digite um titulo para chamado"
        register={register}
        error={errors.name?.message}
      />
      <div className="w-full flex flex-col gap-0.5">
        <label className="text-sm font-bold">Descreva o problema</label>
        <textarea
          placeholder="Descreva o problema..."
          id="description"
          {...register("description")}
          className="inputStyle resize-none h-20 w-full "
        ></textarea>

        {errors.description?.message && (
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        )}
      </div>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
