import { XCircle, CheckCircle, Info } from "lucide-react";

type ToastProps = {
  id: string;
  title?: string;
  description: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

export const Toast = ({
  title,
  description,
  type = "info",
  onClose,
}: ToastProps) => {
  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    info: <Info className="text-blue-500" />,
  };

  return (
    <div className="flex items-center gap-2 rounded-md border bg-white p-3 shadow-md">
      {icons[type]}
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm">{description}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-gray-500 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
};
