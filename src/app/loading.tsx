import { Container } from "@/components/container";
import { TbLoader } from "react-icons/tb";
export default function Loanding() {
  return (
    <Container>
      <main className="w-full flex flex-col items-center justify-center  h-100">
        <TbLoader className="text-5xl animate-spin " />
        <p className="font-bold text-2xl text-center">Carregando dados....</p>
      </main>
    </Container>
  );
}
