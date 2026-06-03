"use client";

import { useContext, useRef, MouseEvent } from "react";
import { ModalContext } from "@/providers/modal";
import { Button } from "../button";
import { useTheme } from "@/providers/theme";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  console.log(theme);

  return (
    <section
      className={`bg-slate-800/20 absolute  w-full min-h-screen h-full z-99 backdrop-blur-xs ${theme === "dark" ? "bg-slate-800/20" : "bg-slate-200"}`}
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center ">
        <div
          ref={modalRef}
          className=" w-9/10 md:w-1/2 max-w-2xl p-3   flex flex-col gap-2 boxStyle"
        >
          <div className="flex w-full justify-between">
            <h2 className="font-black text-2xl">Detalhes do chamados</h2>
            <Button variant="cancel" onClick={handleModalVisible}>
              Fechar
            </Button>
          </div>
          <p>
            <strong>Nome: </strong> {ticket?.ticket.name}
          </p>
          <strong>Descrição: </strong>
          <p>{ticket?.ticket.description}</p>
          <hr />
          <strong>Detalhe do cliente</strong>
          <p className="flex flex-wrap gap-1">
            <strong>Nome:</strong> {ticket?.customer?.name}
          </p>
          <p className="flex flex-wrap gap-1">
            <strong>Telefone:</strong> {ticket?.customer?.phone}
          </p>
          <p className="flex flex-wrap gap-1">
            <strong>Email:</strong> {ticket?.customer?.email}
          </p>
          <p className="flex flex-wrap gap-1">
            <strong>Endereço:</strong> {ticket?.customer?.address}
          </p>
        </div>
      </div>
    </section>
  );
}
