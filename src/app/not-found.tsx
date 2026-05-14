import { Button } from "@/components/button";
import { Container } from "@/components/container";
import Link from "next/link";
import { IoMdAlert } from "react-icons/io";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <Container>
      <main className="flex flex-col items-center gap-2 text-center justify-center w-full h-1/2 ">
        <IoMdAlert className="text-9xl" />
        <div className="flex flex-col justify-center  items-center text-center ">
          <TbError404 className="text-8xl" />

          <strong className="text-3xl md:text-4xl">
            Ops!, página não encontada
          </strong>
        </div>

        <Link href={"/"}>
          <Button>Inicio</Button>
        </Link>
      </main>
    </Container>
  );
}
