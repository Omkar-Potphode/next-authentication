import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: String,
};

export const FormSuccess = ({
    message,
} : FormSuccessProps) => {

    if (!message) return null;

    return (
        <div className="flex items-center text-sm bg-emerald-500/15 text-emerald-500 p-3 gap-y-6 rounded-md">
            <CheckCircledIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
};