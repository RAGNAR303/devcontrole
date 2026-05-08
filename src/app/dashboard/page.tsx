import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Ticket } from "./components/ticket";
import Link from "next/link";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { tr } from "zod/v4/locales";
import { ButtonRefresh } from "./components/buttonrefresh";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/"); // Se não tiver usuario logado, redirecina para tela de login
  }

  const ticket = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO", // Filtra so o chamados como aberto
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true, // inclui o dados do cliente na chamada API
    },
    orderBy: {
      created_at: "desc", // Ordena por data de criação , mais novo primeiro
    },
  });

  return (
    <Container>
      <main className="flex flex-col  w-full">
        <div className="flex  justify-between flex-col gap-2 md:flex-row">
          <h1 className="uppercase text-2xl font-bold ">Meu Chamados</h1>
          <div className=" flex items-center gap-2">
            <ButtonRefresh />
            <Link href={"/dashboard/newTicket"}>
              <Button>
                <FaPlus /> NOVO CHAMADO
              </Button>
            </Link>
          </div>
        </div>

        <table className=" w-full mt-7 rounded overflow-hidden">
          <thead className=" bg-blue-700/50">
            <tr className="uppercase font-bold">
              <td className="pl-2">Clientes</td>
              <td
                align="center"
                className="hidden md:flex justify-center text-center"
              >
                Data do chamado
              </td>
              <td className="py-3">Status</td>
              <td className="text-right pr-2">Açoes</td>
            </tr>
          </thead>
          <tbody>
            {ticket.length > 0 ? (
              ticket.map((ticket) => (
                <Ticket
                  ticket={ticket}
                  customer={ticket.customer}
                  key={ticket.id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} align="center" className="p-2">
                  <p className="text-2xl">Nenhum chamado aberto...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </Container>
  );
}
