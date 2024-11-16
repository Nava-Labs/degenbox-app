import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address: string, digit: number) => {
  return `${address.slice(0, digit)}...${address.slice(44 - digit, 44)}`;
};
