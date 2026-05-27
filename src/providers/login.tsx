"use client";

import { Session, SessionOptions } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface LoginContextProps {
  status: string;
  data: Session | null;
  handleSignOut: () => void;
  handleSignIn: () => void;
}

export const LoginContext = createContext({} as LoginContextProps);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();

  async function handleSignIn() {
    await signIn();

    setTimeout(() => {
      toast.success(`Bem vindo de volta ${data?.user.name}`);
    }, 500);
  }

  async function handleSignOut() {
    await signOut();
    toast.error("Voçê foi deslogado");
  }

 

  return (
    <LoginContext.Provider
      value={{ data, status, handleSignIn, handleSignOut }}
    >
      {children}
    </LoginContext.Provider>
  );
};
