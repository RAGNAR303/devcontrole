import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { Top } from "@/components/top";
import prismaClient from "@/lib/prisma";
import { refresh } from "next/cache";

export default async function EditTicket({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const ticket = await prismaClient.ticket.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
    },
  });

  async function handleUpdateTicket(formData: FormData) {
    "use server";

    const name = await formData.get("name");
    const description = await formData.get("description");

    if (!name || !description) {
      return;
    }

    try {
      await prismaClient.ticket.update({
        where: {
          id: id,
        },
        data: {
          name: name as string,
          description: description as string,
        },
      });

      refresh();
    } catch (error) {}
  }

  return (
    <Container>
      <main className="w-full">
        <Top
          title="Editar Chamado"
          url={"/dashboard"}
          button={<Button variant="cancel">Cancelar</Button>}
        />
        <section className="w-full mt-7">
          <div className="w-full flex mb-5 items-center justify-between flex-wrap inputStyle ">
            <p className="capitalize">
              <strong>Nome: </strong>
              {ticket?.customer?.name}
            </p>
            <p>
              <strong>Email: </strong>
              {ticket?.customer?.email}
            </p>
            <p>
              <strong>Telefone: </strong>
              {ticket?.customer?.phone}
            </p>
          </div>
          <form action={handleUpdateTicket} className="flex flex-col gap-2">
            <Input
              name="name"
              type="text"
              label={"Nome do Chamado"}
              placeholder={"Digite o nome..."}
              required
              defaultValue={ticket?.name}
            />
            <label className="text-sm font-bold">Descreva o problema</label>
            <textarea
              name="description"
              className="py-1 px-3 bg-slate-700/35 rounded outline-0 border border-slate-500/50 focus:ring h-25 resize-none"
              required
              defaultValue={ticket?.description}
            ></textarea>
            <Button
              type="submit"
              className="disabled:opacity-50  disabled:cursor-not-allowed disabled:bg-taupe-600 "
            >
              Atualizar chamado
            </Button>
          </form>
        </section>
      </main>
    </Container>
  );
}
