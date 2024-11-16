import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address: string, digit: number) => {
  return `${address.slice(0, digit)}...${address.slice(44 - digit, 44)}`;
};

export const formatCurrency = (value: number, standard = false) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: standard ? 0 : 2,
    maximumFractionDigits: 2,
    notation: standard ? "standard" : "compact",
  })
    .format(value)
    .replace(/\.00([KMBT])?$/, "$1");
};

