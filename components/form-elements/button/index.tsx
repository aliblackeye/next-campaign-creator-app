import { alata } from "@fonts/fonts";

interface IButton {
    label: string;
    onClick?: () => void;
    className?: string;
    status: "primary" | "secondary",
    size?: "text-sm" | "text-md"
    disabled?: boolean
    block?: boolean
}

export default function Button(props: IButton) {

    // Destructure props
    const { label, onClick, className, status, size, disabled, block } = props;

    return (
        <button
            className={`${alata.className} hover:bg-opacity-90 transition-colors min-w-[126px] select-none px-3 py-2 rounded-lg ${block ? "block w-full" : ""}
            ${status === "primary" ? "bg-primary" : status === "secondary" ? "bg-secondary" : ""} font-normal ${status === "primary" ? "text-white" : "text-black"} ${size ? size : "text-sm"} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} disabled={disabled} onClick={onClick}>
            {label}
        </button>
    )
}
