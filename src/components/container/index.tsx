import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex  justify-between max-w-5xl w-full mx-auto px-2 md:px-6 py-2 min-h-[calc(100dvh-(--spacing(12.5)))] ">
      {children}
    </div>
  );
}
