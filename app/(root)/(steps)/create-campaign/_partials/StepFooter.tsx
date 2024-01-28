// Stores
import { useCampaignStore } from '@store/campaign-store';

// Components
import Button from '@components/form-elements/button'

export default function StepFooter({ disabled }: { disabled?: boolean }) {
    // Stores
    const { stepBack, stepForward } = useCampaignStore();

    return (
        <div className='flex justify-end mt-8 gap-[10px]'>
            <Button status="secondary" label="Geri Dön" onClick={() => stepBack()} />
            <Button status="primary" label="Devam Et" disabled={disabled} onClick={() => stepForward()} />
        </div>
    )
}
