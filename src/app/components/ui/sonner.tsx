"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { AlertTriangle, CheckCircle2, Info, XCircle, } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={ theme as ToasterProps["theme"] }
      icons={ {
        success: <CheckCircle2 className="h-4 w-4 text-success" />,
        error: <XCircle className="h-4 w-4 text-destructive" />,
        warning: <AlertTriangle className="h-4 w-4 text-warning" />,
        info: <Info className="h-4 w-4 text-info" />,
      } }
      { ...props }
      closeButton
      position="bottom-center"
      toastOptions={ { duration: 2000 } }
    />
  );
}
