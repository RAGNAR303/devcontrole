import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Ticket } from "./components/ticket";
import Link from "next/link";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { ButtonRefresh } from "./components/buttonrefresh";
import { Top } from "@/components/top";

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
        <Top
          title="Meu Chamados"
          url={"/dashboard/newTicket"}
          button={
            ticket.length > 0 ? (
              <div className=" flex items-center gap-2">
                <ButtonRefresh />
                <Button>
                  <FaPlus /> NOVO CHAMADO
                </Button>
              </div>
            ) : (
              ""
            )
          }
        />
        {ticket.length > 0 ? (
          <table className=" w-full mt-7 rounded overflow-hidden border-spacing-3.5 drop-shadow drop-shadow-black/30">
            <thead className=" bg-blue-700/50">
              <tr className="uppercase font-bold">
                <td className="pl-2 ">Chamado</td>
                <td colSpan={2} className="pl-2 col-span-2 ">Clientes</td>

                <td className="hidden md:flex  ">Data do chamado</td>
                <td className="py-3  ">Status</td>
                <td className="text-right pr-2 ">Açoes</td>
              </tr>
            </thead>
            <tbody>
              {ticket.length > 0 &&
                ticket.map((ticket) => (
                  <Ticket
                    ticket={ticket}
                    customer={ticket.customer}
                    key={ticket.id}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex flex-col gap-3 items-center justify-center h-1/2">
            <p className="text-2xl font-medium">Nenhum chamado aberto...</p>
            <Link href={"/dashboard/newTicket"}>
              <Button>Abrir Chamado</Button>
            </Link>
          </div>
        )}
      </main>
    </Container>
  );
}
