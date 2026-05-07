import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { CardCustomer } from "./components/card";
import PrismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customer = await PrismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main className=" flex flex-col w-full">
        <div className="flex  justify-between flex-col gap-2 md:flex-row">
          <h1 className="uppercase text-2xl font-bold   ">Meus Clientes</h1>
          {customer.length > 0 && (
            <Link href={"/dashboard/customer/newCustomer"}>
              <Button>NOVO cliente</Button>
            </Link>
          )}
        </div>
        <section className="grid mt-7 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {customer.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {customer.length === 0 && (
          <section className="h-2/4 flex flex-col gap-3 items-center justify-center">
            <h2 className="text-2xl">Nenhum cliente cadastrado</h2>
            <Link href={"/dashboard/customer/newCustomer"}>
              <Button>NOVO cliente</Button>
            </Link>
          </section>
        )}
      </main>
    </Container>
  );
}
