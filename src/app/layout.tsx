import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";

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
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
