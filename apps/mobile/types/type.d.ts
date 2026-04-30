import { ImageSourcePropType, InputModeOptions, TextInputProps } from "react-native";

declare global {
    interface InputFieldProps extends TextInputProps {
        placeholder: string;
        type: InputModeOptions;
        rightElement?: React.ReactNode;
    }
    interface LiquidGlassButtonProps {
        title?: string;
        onPress: () => void;
        icon?: ImageSourcePropType;
        className?: string;
        textClassName?: string;
        disabled?: boolean;
        iconClassName?: string;
        iconSize?: string;
    }
}

export {};