import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    GestureResponderEvent,
    View,
} from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    className?: string;         // optional: Tailwind class for button
    textClassName?: string;     // optional: Tailwind class for text
    disabled?: boolean;
    borderColor?: string;       // as border color
    textColor?: string;         // optional custom text color
    icon?: React.ReactNode;
    widht?: number;           // optional: width of the button
    height?: number;          // optional: height of the button
}

const CustomButtonSosialMedia: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    className = "",
    textClassName = "",
    disabled = false,
    borderColor = "#AAA",
    textColor = "#fff",
    icon,
    widht,
    height,
}) => {
    return (
        <TouchableOpacity
            className={`rounded-lg items-center justify-center py-3 ${className}`}
            style={[styles.button, { borderColor, borderWidth: 1, width: widht, height: height }]}
            onPress={onPress}
            disabled={disabled}
        >
            <View className="flex-row items-center">
                <Text
                    className={`text-xl font-bold ${textClassName}`}
                    style={{ color: textColor, marginRight: icon ? 5 : 0 }}
                >
                    {title}
                </Text>
                {icon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
    },
});

export default CustomButtonSosialMedia;
