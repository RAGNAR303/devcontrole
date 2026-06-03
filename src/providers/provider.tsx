import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { LoginProvider } from "./login";
import { ModalProvider } from "./modal";
import { ThemeProvider } from "./theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LoginProvider>
        <ModalProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ModalProvider>
      </LoginProvider>
    </AuthProvider>
  );
}
