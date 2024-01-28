import { PackageType } from "./package-type";

export type CampaignType = {
  track: any;
  currency: "TRY" | "USD";
  genreList:  { label: string; value: string }[] | null;
  selectedGenres: { label: string; value: string }[];
  package: PackageType | null;
  packages: PackageType[] | null;
  dates: any[];
  startDate: any;
  notPublished: boolean;
};
