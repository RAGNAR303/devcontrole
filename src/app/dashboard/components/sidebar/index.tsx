"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoFileTrayStacked } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";

export function SideBar() {
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [customer, setCustomer] = useState(false);


  return (
    <div
      className={`flex flex-col md:p-5 p-3  bg-slate-700/35  md:hover:items-start  w-full max-w-12 md:max-w-18 min-h-[calc(100vh-(--spacing(12.5)))] md:hover:h-full md:hover:max-w-55  rounded-br-2xl rounded-tr-2xl shadow-2xl  shadow-black/50 drop-shadow drop-shadow-black/30 overflow-hidden duration-200 group  z-30 fixed  backdrop-blur-2xl  ${open ? `max-w-50 w-full absolute items-start ` : "max-w-15"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex gap-3  text-xl  uppercase font-bold mt-8 md:hidden  hover:text-blue-700 active:text-blue-700   duration-200"
      >
        <TiThMenu className="text-3xl" />
        <p
          className={`md:hidden md:group-hover:block ${open ? "block" : "hidden"} `}
        >
          menu
        </p>
      </button>

      <nav className=" flex gap-6 flex-col uppercase font-bold mt-8">
        <div>
          <div className="flex gap-2 ">
            <Link
              href={"/dashboard"}
              className="flex items-center gap-3 text-xl hover:text-blue-700 active:text-blue-700  duration-200"
            >
              <IoFileTrayStacked className="text-3xl" />
              <p
                className={`md:hidden md:group-hover:block ${open ? "block" : "hidden"}`}
              >
                Chamados
              </p>
            </Link>

            <button onClick={() => setTicket(!ticket)}>
              <TiArrowSortedDown
                className={`duration-200 hover:text-blue-700 active:text-blue-700 md:group-hover:block md:hidden ${ticket ? "rotate-180" : "rotate-0"}  ${open ? "block" : "hidden"}   `}
              />
            </button>
          </div>

          {ticket && (
            <Link href={"/dashboard/newTicket"}>
              <p
                className={`pl-10 mt-3 duration-200 flex w-full items-center gap-1 hover:text-blue-700 active:text-blue-700 md:group-hover:block md:hidden  ${open ? "block" : "hidden"}  `}
              >
                <FaPlus /> Chamado
              </p>
            </Link>
          )}
        </div>

        <div>
          <div className="flex gap-2 ">
            <Link
              href={"/dashboard/customer"}
              className="flex items-center gap-3 text-xl hover:text-blue-700 active:text-blue-700   duration-200"
            >
              <FaUserAlt className="text-3xl" />
              <p
                className={`md:hidden md:group-hover:block ${open ? "block" : "hidden"}`}
              >
                Clientes
              </p>
            </Link>

            <button onClick={() => setCustomer(!customer)}>
              <TiArrowSortedDown
                className={`duration-200 hover:text-blue-700 active:text-blue-700 md:group-hover:block md:hidden ${customer ? "rotate-180" : "rotate-0"}  ${open ? "block" : "hidden"}   `}
              />
            </button>
          </div>

          {customer && (
            <Link href={"/dashboard/customer/newCustomer"}>
              <p
                className={`pl-10 mt-3 duration-200 flex w-full items-center gap-1 hover:text-blue-700 active:text-blue-700 md:group-hover:block md:hidden ${open ? "block" : "hidden"}  `}
              >
                <FaPlus /> Cliente
              </p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
