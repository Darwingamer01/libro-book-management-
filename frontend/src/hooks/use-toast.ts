import { toast as sonnerToast } from "sonner";

export type ToastProps = {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    action?: React.ReactNode;
}

export const useToast = () => {
    return {
        toast: ({ title, description, variant }: ToastProps) => {
            if (variant === "destructive") {
                sonnerToast.error(title, { description });
            } else {
                sonnerToast.success(title, { description });
            }
        }
    }
}
