"use client";

import { Button } from "@/components/button";
import { RiRefreshFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function ButtonRefresh() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        toast.success("Chamados Atualizados");
        router.refresh();
      }}
    >
      <RiRefreshFill className="text-2xl active:animate-spin hover:animate-spin" />
    </Button>
  );
}
