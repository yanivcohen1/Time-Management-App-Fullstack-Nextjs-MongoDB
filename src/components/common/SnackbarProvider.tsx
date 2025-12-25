"use client";

import { ReactNode, useEffect } from "react";
import { SnackbarProvider as NotistackProvider, useSnackbar } from "notistack";
import { setEnqueueSnackbar } from "@/lib/ui/snackbar";

function GlobalSnackbarSetter() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setEnqueueSnackbar((message, options) => {
      enqueueSnackbar(message, options);
    });
  }, [enqueueSnackbar]);

  return null;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  return (
    <NotistackProvider maxSnack={3}>
      <GlobalSnackbarSetter />
      {children}
    </NotistackProvider>
  );
}
