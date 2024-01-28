import { Alata, Inter } from "next/font/google";

export const alata = Alata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-secondary",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-primary",
});
