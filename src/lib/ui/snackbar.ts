export type SnackbarSeverity = "success" | "info" | "warning" | "error";

export type SnackbarMessage = {
  message: string;
  severity?: SnackbarSeverity;
};

type Variant = "default" | "info" | "error" | "success" | "warning";

type EnqueueSnackbar = (message: string, options?: { variant?: Variant }) => void;

let enqueueSnackbar: EnqueueSnackbar | null = null;

export const setEnqueueSnackbar = (fn: EnqueueSnackbar) => {
  enqueueSnackbar = fn;
};

export const showSnackbar = (message: SnackbarMessage) => {
  if (enqueueSnackbar) {
    const variant: Variant = message.severity || "info";
    enqueueSnackbar(message.message, { variant });
  }
};
