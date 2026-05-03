import { ReactNode } from "react";
import { SideBar } from "./components/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex w-full h-dvh ">
      <SideBar />
      <section className="w-full ml-12 md:m-0 ">{children}</section>
    </div>
  );
}
