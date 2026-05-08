"use client";

import { Button } from "@/components/button";
import { RiRefreshFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
export function ButtonRefresh() {
  const router = useRouter();

  return (
    <Button onClick={() => router.refresh()}>
      <RiRefreshFill className="text-2xl" />
    </Button>
  );
}
