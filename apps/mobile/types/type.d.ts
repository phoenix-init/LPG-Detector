import { ImageSourcePropType, InputModeOptions, TextInputProps, LucideIcon } from "react-native";

declare global {
    interface InputFieldProps extends TextInputProps {
        placeholder: string;
        type: InputModeOptions;
        rightElement?: React.ReactNode;
    }
    interface LiquidGlassButtonProps {
        title?: string;
        onPress: () => void;
        icon?: any;
        className?: string;
        textClassName?: string;
        disabled?: boolean;
        iconClassName?: string;
        iconSize?: string;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }

    interface SystemDiagnosticCardProps {
        id: number;
        title: string;
        reading: string;
        icon: LucideIcon;
    }

    interface LeakDetectionProps {
    status: "Leak" | "Warning" | "Safe"
    message: string;
    description: string;
}
}

export {};