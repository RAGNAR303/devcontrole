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

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function Ticket({ ticket, customer }: TicketItemProps) {
  const { handleModalVisible, setDetailModal } = useContext(ModalContext);

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
      <tr className="bg-slate-700/35 backdrop-blur-2xl hover:bg-slate-800 duration-200 border-b-2 border-transparent  last:border-0 last:rounded-b">
        <td className="pl-2 " data-label="nome">
          {customer?.name}
        </td>
        <td className="hidden md:block" data-label="Data do chamado">
          {ticket.created_at?.toLocaleDateString("pt-BR")}
        </td>
        <td className="py-3" data-label="status">
          <span className="bg-green-300 text-green-800 p-1 rounded ">
            {ticket.status}
          </span>
        </td>
        <td align="right" className="text-xl" data-label="ações">
          <button onClick={handleShowModal} className="pr-2 relative group">
            <FaCircleInfo className="text-blue-500/50 hover:text-blue-500 duration-200  " />
            <div className="bg-slate-700 absolute z-99 right-8 px-2 rounded text-sm opacity-0 hidden    flex-col duration-100 border-l-4 border-blue-700/50 group-hover:opacity-100 group-hover:flex ">
              <p className="uppercase">Detalhes</p>
            </div>
          </button>

          <button className="pr-2 relative group" onClick={handleTicketStatus}>
            <MdCheckBox className="text-slate-400 hover:text-slate-600 duration-200 text-2xl" />
            <div className="bg-slate-700 absolute z-99 right-8 px-2 rounded text-sm opacity-0 hidden    flex-col duration-100 border-l-4 border-blue-700/50 group-hover:opacity-100 group-hover:flex ">
              <p className="uppercase inline-block">Encerrar Chamado</p>
            </div>
          </button>

          <button
            className="pr-2 relative group"
            onClick={() => handleEditTicket(ticket.id)}
          >
            <RiEditBoxFill className="text-green-400 hover:text-green-600 duration-200 text-2xl" />
            <div className="bg-slate-700 absolute z-99 right-8 px-2 rounded text-sm opacity-0 hidden    flex-col duration-100 border-l-4 border-blue-700/50 group-hover:opacity-100 group-hover:flex ">
              <p className="uppercase">Editar</p>
            </div>
          </button>
        </td>
      </tr>
    </>
  );
}
