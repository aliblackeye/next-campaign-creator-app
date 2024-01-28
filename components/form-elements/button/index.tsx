
// Libs
import { motion } from "framer-motion";

// Fonts
import { alata } from "@fonts/fonts";

// Icons
import { CgSpinner } from "react-icons/cg";

interface IButton {
    label: string;
    onClick?: () => void;
    className?: string;
    status: "primary" | "secondary",
    size?: "text-sm" | "text-md"
    disabled?: boolean
    block?: boolean
    loading?: boolean
}

export default function Button(props: IButton) {

    // Destructure props
    const { label, onClick, className, status, size, disabled, block, loading } = props;


    const item = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
        }
    }

    return (
        <motion.button
            variants={item}

            className={`${alata.className} ${className} transition-colors min-w-[126px] font-normal select-none px-3 py-2 rounded-lg ${block ? "block w-full" : "inline-flex items-center justify-center"}
            ${status === "primary" ? "bg-primary" : status === "secondary" ? "bg-secondary" : ""} ${status === "primary" ? "text-white" : "text-black"} ${size ? size : "text-sm"} ${disabled ? "bg-opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-opacity-70 "}`}
            disabled={loading || disabled}
            onClick={!loading ? onClick : undefined}>
            {label}
            {loading && <div className="ml-2 animate-spin">
                <CgSpinner />
            </div>}
        </motion.button>
    )
}
