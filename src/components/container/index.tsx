import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="flex  justify-between max-w-5xl w-full mx-auto px-2 md:px-6 py-2">
      {children}
    </div>
  );
}
