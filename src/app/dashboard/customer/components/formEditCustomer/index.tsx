"use client";

import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function FormEditCustomer() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    async function loadCustomer() {
      try {
        const response = await api.get(`/api/customer/${id}`);
        const data: FormData = response.data;

        reset({
          name: data.name,
          address: data.address,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
     
        router.push("/dashboard/customer");
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [id, reset]);

  async function handleEditCustomer(data: FormData) {
  
    await api.put(`/api/customer/${id}`, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
    });
    toast.success("Cliente atualizado com sucesso");
    router.push("/dashboard/customer");
  }

  if (loading) {
    return (
      <p className="text-2xl font-bold">Carregando dados do cliente.....</p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditCustomer)}
      className="flex flex-col  gap-2.5"
    >
      <Input
        type="text"
        placeholder="Digite o nome completo..."
        label={"Nome completo"}
        {...register("name")}
        error={errors.name?.message}
      />

      <section className="flex gap-2 flex-col md:flex-row w-full">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Exe. (DD) 99999999"
            label={"Telefone"}
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-2">
          <Input
            type="email"
            placeholder="Digite seu email"
            label={"Email"}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </section>
      <Input
        type="text"
        placeholder="Digite seu endereço"
        label={"Endereço(opicional)"}
        {...register("address")}
        error={errors.address?.message}
      />
      <Button type="submit" className="mt-1.5">
        Atualizar Cliente
      </Button>
    </form>
  );
}
