import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FormEditCustomer } from "../../components/formEditCustomer";
import { Top } from "@/components/top";

export default async function editCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col w-full">
        <Top
          title="Editar Cliente"
          url="/dashboard/customer"
          button={<Button variant="cancel">Cancelar</Button>}
        />
        <section className="mt-7">
          <FormEditCustomer />
        </section>
      </main>
    </Container>
  );
}
