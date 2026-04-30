import google from '@/assets/icons/google.png';
import qr from '@/assets/icons/qr-code.png';

export const icons = {
    google, 
    qr
} as const

export type IconKey = keyof typeof icons;