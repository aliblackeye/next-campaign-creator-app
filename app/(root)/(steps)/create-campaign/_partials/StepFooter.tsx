// Lib
import { motion } from 'framer-motion'

// Stores
import { useCampaignStore } from '@store/campaign-store';

// Components
import Button from '@components/form-elements/button'

export default function StepFooter({ disabled, animationDisabled }: { disabled?: boolean, animationDisabled?: boolean }) {
    // Stores
    const { stepBack, stepForward } = useCampaignStore();
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    return (
        <motion.div
            animate="visible"
            initial="hidden"
            variants={!animationDisabled ? container : undefined}
            className='flex justify-end mt-8 gap-[10px]'>
            <Button status="secondary" label="Geri Dön" onClick={() => stepBack()} />
            <Button status="primary" label="Devam Et" disabled={disabled} onClick={() => stepForward()} />
        </motion.div>

    )
}
