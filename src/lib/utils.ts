import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns a delay with a random duration (0.5s to 3s)
export function randomDelay(): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (3000 - 500 + 1)) + 500),
  );
}

export async function getMessages(locale: string) {
  return (await import(`../messages/${locale}.json`)).default;
}
