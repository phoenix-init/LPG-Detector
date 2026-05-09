import google from '@/assets/icons/google.png';
import qr from '@/assets/icons/qr-code.png';
import loader from "@/assets/icons/loading-animation.png"
import gas from "@/assets/icons/gas.png"

export const icons = {
    google, 
    qr,
    loader,
    gas
} as const

export type IconKey = keyof typeof icons;