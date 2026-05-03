"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdOutlineAlternateEmail, MdPhone } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();
  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      console.log(response.data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className=" bg-slate-700/35 rounded p-2 drop-shadow drop-shadow-black/30 hover:scale-[1.02] duration-200 hover:shadow-md shadow-black/20 border-l-6 border-blue-700/50">
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
        <li className="mt-2">
          <button
            onClick={handleDeleteCustomer}
            className="bg-red-800 hover:bg-red-600 duration-200 px-2 uppercase font-bold rounded"
          >
            Deletar
          </button>
        </li>
      </ul>
    </article>
  );
}
