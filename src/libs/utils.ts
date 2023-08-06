import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function postRequest(url: string, { arg }: { arg: any }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  })
}