import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { Toaster } from "sonner";
import { LoginProvider } from "@/providers/login";
import { ThemeProvider } from "@/providers/theme";
import { Providers } from "@/providers/provider";

export const metadata: Metadata = {
  title: "Gerencimento de chamados",
  description: "Atendimento ao cliente para sua empresa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
          <Toaster
            expand
            visibleToasts={9}
            offset={{ bottom: "24px", right: "16px", left: "16px" }}
            mobileOffset={{ top: "16px" }}
            richColors
            closeButton
            duration={3000}
            theme="dark"
          />
        </Providers>
      </body>
    </html>
  );
}
