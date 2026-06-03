import { useTheme } from "@/providers/theme";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-700/50 text-xl rounded-full p-1 border border-slate-700/35 active:scale-95 hover:scale-95 duration-150 "
    >
      {theme === "light" ? <BsMoonFill /> : <BsFillSunFill />}
    </button>
  );
}
