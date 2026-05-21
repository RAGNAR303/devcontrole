"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, "O campo nome e obrigatorio"),
  email: z
    .string()
    .email("Digite um email valido")
    .min(1, "O email e obrigatorio"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || //(DD) 999999999 || (DD)999999999
        /^\d{2}\s\d{9}$/.test(value) || // DD999999999 || DD 999999999
        /^\d{11}$/.test(value) // DD999999999
      );
    },
    {
      message: "O numero de telefone deve estar (DD) 999999999",
    },
  ),
  address: z.string(),
});

export type FormData = z.infer<typeof schema>;

export function FormCreateCustomer({ userId }: { userId: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handledSubmitCustumer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    });
    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      onSubmit={handleSubmit(handledSubmitCustumer)}
      className="flex flex-col  gap-2.5"
    >
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        label={"Nome completo"}
        register={register}
        error={errors.name?.message}
      />

      <section className="flex gap-2 flex-col md:flex-row w-full">
        <div className="flex-1">
          <Input
            type="number"
            name="phone"
            placeholder="Exe. (DD) 99999999"
            label={"Telefone"}
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-2">
          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            label={"Email"}
            register={register}
            error={errors.email?.message}
          />
        </div>
      </section>
      <Input
        type="text"
        name="address"
        placeholder="Digite seu endereço"
        label={"Endereço"}
        register={register}
        error={errors.address?.message}
      />
      <Button type="submit" className="mt-1.5">
        cadastrar
      </Button>
    </form>
  );
}
