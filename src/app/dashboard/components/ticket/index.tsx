"use client";

import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FaCircleInfo } from "react-icons/fa6";
import { RiEditBoxFill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "@/providers/theme";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function Ticket({ ticket, customer }: TicketItemProps) {
  const { handleModalVisible, setDetailModal } = useContext(ModalContext);

  const { theme } = useTheme();
  const router = useRouter();

  async function handleTicketStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      toast.error("Chamado foi encerrado");
      router.refresh();
    } catch (error) {}
  }

  function handleShowModal() {
    handleModalVisible(); // Chama a função de abrir modal
    setDetailModal({
      // Envia em objeto customer , ticket
      customer: customer,
      ticket: ticket,
    });
  }

  function handleEditTicket(id: string) {
    router.push(`/dashboard/edit/${id}`);
  }

  return (
    <>
      <tr
        className={`bg-slate-700/35 backdrop-blur-2xl duration-200 border-b border-transparent  last:border-0 last:rounded-b drop-shadow drop-shadow-black/30 ${theme === "dark" ? "hover:bg-slate-800/50 " : "hover:bg-slate-500/50"} `}
      >
        <td className="pl-2 " data-label="chamado">
          {ticket.ticketCode}
        </td>

        <td colSpan={2} className="pl-2 col-span-2 " data-label="nome">
          {customer?.name}
        </td>

        <td className="hidden md:block" data-label="Data do chamado">
          {ticket.created_at?.toLocaleDateString("pt-BR")}
        </td>
        <td className="py-3" data-label="status">
          <span
            className={`p-1 rounded font-bold ${ticket.status === "ABERTO" ? " bg-green-300 text-green-800" : "bg-red-300 text-red-800"}  `}
          >
            {ticket.status}
          </span>
        </td>
        <td align="right" className="text-xl" data-label="ações">
          <button onClick={handleShowModal} className="pr-2 relative group">
            <FaCircleInfo className="text-blue-500/50 hover:text-blue-500 duration-200  " />
            <div className=" absolute z-99 right-8 px-2  text-sm opacity-0 hidden  flex-col duration-100 group-hover:opacity-100 group-hover:flex boxStyle">
              <p className="uppercase">Detalhes</p>
            </div>
          </button>

          <button className="pr-2 relative group" onClick={handleTicketStatus}>
            <MdCheckBox className="text-slate-400 hover:text-slate-600 duration-200 text-2xl" />
            <div className=" absolute z-99 right-8 px-2  text-sm opacity-0 hidden  flex-col duration-100 group-hover:opacity-100 group-hover:flex boxStyle">
              <p className="uppercase inline-block">Encerrar</p>
            </div>
          </button>

          <button
            className="pr-2 relative group"
            onClick={() => handleEditTicket(ticket.id)}
          >
            <RiEditBoxFill className="text-green-400 hover:text-green-600 duration-200 text-2xl" />
            <div className=" absolute z-99 right-8 px-2  text-sm opacity-0 hidden  flex-col duration-100 group-hover:opacity-100 group-hover:flex boxStyle">
              <p className="uppercase">Editar</p>
            </div>
          </button>
        </td>
      </tr>
    </>
  );
}
