import Link from "next/link";
import { ReactNode } from "react";

interface TopProps {
  title: string;
  url: string;
  button: ReactNode;
}

export const Top = ({ button, title, url }: TopProps) => {
  return (
    <div className="flex  justify-between flex-col gap-2 md:flex-row mt-5 md:mt-10">
      <h1 className="uppercase text-2xl font-bold ">{title}</h1>
      <Link href={url}>{button}</Link>
    </div>
  );
};
