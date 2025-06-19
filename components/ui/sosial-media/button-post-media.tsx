import PlusIcons from "@/assets/icons/sosial-media/plus-icons"
import React, { ReactNode } from "react"
import { Text, TouchableOpacity, View } from "react-native"


interface ButtonPostMediaProps {
    icon: ReactNode,
    label: string
    onPress?: () => void
}

const ButtonPostMedia: React.FC<ButtonPostMediaProps> = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 175,
                height: 84,
                borderRadius: 6,
                backgroundColor: "#F9F9F9",
                paddingVertical: 16,
                paddingHorizontal: 12
            }}>
            <View className="flex-row justify-between">
                {icon}
                <PlusIcons width={20} height={20} />
            </View>
            <Text className="font-medium text-[14px] mt-2">{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonPostMedia