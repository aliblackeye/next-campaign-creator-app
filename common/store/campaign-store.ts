import { create } from "zustand";

// Types
import { CampaignType } from "../types/campaign-type";

interface CampaignStore {
  step: number;
  campaign: CampaignType;
  setCampaign: (values: CampaignType) => void;
  setStep: (step: number) => void;
  stepBack: () => void;
  stepForward: () => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  step: 0,
  campaign: {
    track: null,
    currency: "TRY",
    genreList: null,
    selectedGenres: [],
    package: null,
    packages: null,
    notPublished: false,
    startDate: null,
    dates: [],
  },
  
  setCampaign: (values) =>
    set({
      campaign: {
        ...values,
      },
    }),
  setStep: (step) => set({ step }),
  stepBack: () => set((state) => ({ step: state.step - 1 })),
  stepForward: () => set((state) => ({ step: state.step + 1 })),
  
}));
