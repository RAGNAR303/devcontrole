"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoFileTrayStacked } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
export function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col md:p-5 p-2 bg-slate-700/35 items-center hover:items-start active:items-start w-full max-w-12 md:max-w-18 hover:max-w-50 min-h-[calc(100vh-(--spacing(12.5)))] hover:h-full active:h-full rounded-br-2xl rounded-tr-2xl shadow-2xl  shadow-black/50 drop-shadow drop-shadow-black/30 overflow-hidden duration-200 group hover:absolute active:absolute  z-30 fixed  backdrop-blur-2xl active:max-w-50  ${open && `active:max-w-50 active:h-full active:absolute  `}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="block md:hidden mt-4 hover:text-blue-700 active:text-blue-700   duration-200"
      >
        <TiThMenu className="text-3xl" />
      </button>

      <nav className=" flex gap-6 flex-col uppercase font-bold mt-8">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-3 text-xl hover:text-blue-700 active:text-blue-700  duration-200"
        >
          <IoFileTrayStacked className="text-3xl" />
          <p className="hidden group-hover:block group-active:block">
            Chamados
          </p>
        </Link>

        <Link
          href={"/dashboard/customer"}
          className="flex items-center gap-3 text-xl hover:text-blue-700 active:text-blue-700   duration-200"
        >
          <FaUserAlt className="text-3xl" />
          <p className="hidden group-hover:block group-active:block">
            Clientes
          </p>
        </Link>
      </nav>
    </div>
  );
}
