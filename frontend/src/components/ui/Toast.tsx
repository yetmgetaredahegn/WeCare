import { useEffect, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

export type ToastState = {
    message: string;
    variant?: ToastVariant;
};

export const useToast = () => {
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = (message: string, variant: ToastVariant = "info") => {
        setToast({ message, variant });
    };

    const clearToast = () => setToast(null);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    return { toast, showToast, clearToast };
};

const variantClasses: Record<ToastVariant, string> = {
    success: "bg-emerald-600",
    error: "bg-rose-600",
    info: "bg-slate-800",
};

const Toast = ({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) => {
    if (!toast) return null;

    const variant = toast.variant ?? "info";

    return (
        <div className="fixed right-6 top-6 z-50">
            <div
                className={`${variantClasses[variant]} text-white shadow-lg rounded-lg px-4 py-3 flex items-start gap-3`}
                role="status"
            >
                <span className="text-sm leading-5">{toast.message}</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-auto text-white/80 hover:text-white transition"
                    aria-label="Close notification"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;
