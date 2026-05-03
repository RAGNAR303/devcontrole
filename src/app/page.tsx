import Image from "next/image";
import banner from "../../public/image.png";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col w-full gap-2 min-h-[calc(100vh-(--spacing(12.5)))] p-4 text-center">
      <h1 className="font-extralight text-xl md:text-2xl">
        Gerencie sua Empresa
      </h1>
      <strong className="text-blue-800 text-xl md:text-3xl ">
        Atendimento , Clientes
      </strong>

      <Image
        src={banner}
        alt="banner"
        width={400}
        className="max-w-sm md:max-w-xl "
        loading="eager"
      />
    </main>
  );
}
