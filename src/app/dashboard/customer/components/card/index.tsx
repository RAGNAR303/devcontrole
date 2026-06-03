"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { MdOutlineAlternateEmail, MdPhone } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "@/providers/theme";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();
  const { theme } = useTheme();
  async function handleDeleteCustomer() {
    try {
      await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });
      toast.error("Cliente excluido!");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditCustomer(id: string) {
    router.push(`/dashboard/customer/editCustomer/${id}`);
  }

  return (
    <article
      className={`   p-2  hover:scale-[1.02] duration-200 hover:shadow-md shadow-black/20 border-l-6 border-blue-700/50 boxStyle ${theme === "dark" ? "hover:bg-slate-800/50 " : "hover:bg-slate-500/50"}  `}
    >
      <ul>
        <li className="flex items-center gap-1">
          <strong className="uppercase">
            <FaUserAlt />
          </strong>
          <p className="capitalize">{customer.name}</p>
        </li>
        <li className="flex items-center  gap-1">
          <strong className="uppercase">
            <MdOutlineAlternateEmail />
          </strong>
          <p>{customer.email}</p>
        </li>
        <li className="flex items-center  gap-1">
          <strong className="uppercase">
            <MdPhone />
          </strong>
          <p>{customer.phone}</p>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Button onClick={handleDeleteCustomer} variant="cancel">
            Deletar
          </Button>

          <Button onClick={() => handleEditCustomer(customer.id)}>
            Editar
          </Button>
        </li>
      </ul>
    </article>
  );
}
