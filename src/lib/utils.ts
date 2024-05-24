import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toCurrency(price: number) {
  const newPrice = new Intl.NumberFormat("ru-RU", {
      currency: "RUB",
      style: "currency",
  })
      .format(price)
      .replace(",00", "");
  return newPrice;
}
