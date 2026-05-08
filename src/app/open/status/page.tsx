import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
export default function statusOk() {
  return (
    <Container>
      <section className="flex flex-col gap-5  w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 mt-10 w-full max-w-xl mx-auto bg-slate-700/30 px-2 md:px-10 py-10 rounded backdrop-blur-2xl">
          <FaCheckCircle className="text-green-600 text-7xl " />
          <strong className="md:text-2xl text-center">
            Chamado criando com sucesso!
          </strong>
        </div>
        <Link href={"/open"}>
          <Button>Abrir outro Chamada</Button>
        </Link>
      </section>
    </Container>
  );
}
