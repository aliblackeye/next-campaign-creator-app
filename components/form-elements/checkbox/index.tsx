interface ICheckbox {
    name: string;
    label: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    checked?: boolean
}

export default function Checkbox(props: ICheckbox) {

    // Destructuring
    const { name, label, onChange, className,checked } = props

    return (
        <div className={`checkbox flex items-center  gap-2 ${className ? className : ""}`}>
            <input id={name} name={name} onChange={onChange} checked={checked} type="checkbox" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checked:border-primary" />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={name}>{label}</label>
        </div>
    )
}
