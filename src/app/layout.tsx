import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { Toaster } from "sonner";

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
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
