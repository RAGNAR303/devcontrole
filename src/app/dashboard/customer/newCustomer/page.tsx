import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { FormCreateCustomer } from "../../components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col w-full">
        <div className="flex  justify-between flex-col gap-2 md:flex-row">
          <h1 className="uppercase text-2xl font-bold ">Novo Cliente</h1>
          <Link href={"/dashboard/customer"}>
            <Button>Voltar</Button>
          </Link>
        </div>
        <section className="mt-7">
          <FormCreateCustomer userId={session.user.id} />
        </section>
      </main>
    </Container>
  );
}
