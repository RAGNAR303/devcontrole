import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { IoFileTrayStacked } from "react-icons/io5";
export function SideBar() {
  return (
    <div className="flex md:p-5 p-2 bg-slate-700/35  w-full max-w-12 md:max-w-18 hover:max-w-50 min-h-[calc(100vh-(--spacing(12.5)))] hover:h-full rounded-br-2xl rounded-tr-2xl drop-shadow drop-shadow-black/30 overflow-hidden duration-200 group hover:absolute z-30 hover:bg-slate-800 fixed">
      <nav className=" flex gap-6 flex-col uppercase font-bold mt-8">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-3 text-xl hover:text-blue-700 duration-200"
        >
          <IoFileTrayStacked className="text-3xl" />
          <p className="hidden group-hover:block">Chamados</p>
        </Link>
        <Link
          href={"/dashboard/customer"}
          className="flex items-center gap-3 text-xl hover:text-blue-700 duration-200"
        >
          <FaUserAlt className="text-3xl" />
          <p className="hidden group-hover:block">Clientes</p>
        </Link>
      </nav>
    </div>
  );
}
