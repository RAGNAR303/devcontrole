import { Container } from "@/components/container";
import { FaCheckCircle } from "react-icons/fa";
export default function statusOk() {
  return (
    <Container>
      <section className="w-full items-center justify-center">
        <div className="flex flex-col gap-2 mt-5 w-full max-w-xl bg-slate-700/30 px-2 md:px-10 py-5 rounded backdrop-blur-2xl">
          <FaCheckCircle className="text-green-600" />
          <p>Chamado criando com sucesso!</p>
        </div>
      </section>
    </Container>
  );
}
