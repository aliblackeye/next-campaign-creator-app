
import { motion } from 'framer-motion'

interface ISelectItem {
    badge: string;
    title: string;
    subtitle: string;
    selected?: boolean;
    onClick?: () => void;
    footerLeftText?: string;
    footerRightText?: string;

}

export default function SelectItem(props: ISelectItem) {

    // Destructuring
    const { footerLeftText, footerRightText, badge, subtitle, title, selected, onClick } = props

    // Variables
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        }
        
    }

    return (
        <motion.div
            variants={item}
            onClick={onClick}
            className={`transition-colors mb-3 p-4 rounded-[12px] border-2 border-border hover:bg-primary/5 ${selected ? "border-primary bg-primary/5" : ""}`}
        >
            <h4 className='mb-1 text-sm text-primary'>{title}</h4>
            <div className='badge'>{badge}</div>
            <div className='flex justify-between items-center'>
                <span className='text-gray text-sm'>{subtitle}</span>

                <div className='currency-and-price'>
                    <div>{footerLeftText} {footerRightText}</div>
                </div>
            </div>
        </motion.div>
    )
}
