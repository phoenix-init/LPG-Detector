import google from '@/assets/icons/google.png';
import qr from '@/assets/icons/qr-code.png';
import loader from "@/assets/icons/loading-animation.png"
import home from '@/assets/icons/home.png'
import setting from '@/assets/icons/settings.png'
import analytics from '@/assets/icons/analytics.png'

export const icons = {
    google, 
    qr,
    loader,
    home,
    setting,
    analytics
} as const

export type IconKey = keyof typeof icons;