import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: String,
};

export const FormError = ({
    message,
} : FormErrorProps) => {

    if (!message) return null;

    return (
        <div className="flex items-center text-sm bg-destructive/15 text-destructive p-3 gap-y-6 rounded-md">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
};