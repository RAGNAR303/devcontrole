import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { Top } from "@/components/top";
import { success } from "zod";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customer = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleNewTicket(formData: FormData) {
    "use server";
    const name = await formData.get("name");
    const description = await formData.get("description");
    const customerId = await formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        status: "ABERTO",
        customerId: customerId as string,
        userId: session?.user.id,
      },
    });


    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="w-full ">
        <Top
          title="Novo chamado"
          url={"/dashboard"}
          button={<Button variant="cancel">cancelar</Button>}
        />
        <section className="mt-7">
          <form action={handleNewTicket} className="flex flex-col w-full gap-2">
            <label className="text-sm font-bold">Nome do chamado</label>
            <input
              name="name"
              type="text"
              placeholder="Digite o nome..."
              className="py-1 px-3 bg-slate-700/35 rounded outline-0 border border-slate-500/50 focus:ring"
              required
            />
            <label className="text-sm font-bold">Descreva o problema</label>
            <textarea
              name="description"
              placeholder="Digite o nome..."
              className="py-1 px-3 bg-slate-700/35 rounded outline-0 border border-slate-500/50 focus:ring h-25 resize-none"
              required
            ></textarea>
            {customer.length !== 0 ? (
              <>
                <label className="text-sm font-bold">
                  Selecione seu cliente
                </label>
                <select
                  name="customer"
                  className="py-1 px-3 bg-slate-700/35 rounded  outline-0 border border-slate-500/50 focus:ring capitalize"
                >
                  {customer.map((customer) => (
                    <option
                      value={customer.id}
                      key={customer.id}
                      className="capitalize bg-slate-700 rounded"
                    >
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <Link href={"/dashboard/customer/newCustomer"}>
                Nenhum cliente cadastrado{" "}
                <span className="font-medium text-blue-700 hover:text-blue-500 duration-200">
                  Clique para cadastrar
                </span>
              </Link>
            )}

            <Button
              type="submit"
              className="disabled:opacity-50  disabled:cursor-not-allowed disabled:bg-taupe-600 "
              disabled={customer.length === 0}
            >
              Cadastrar
            </Button>
          </form>
        </section>
      </main>
    </Container>
  );
}
