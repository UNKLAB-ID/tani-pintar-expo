import CloseIcons from "@/assets/icons/global/close-icons"
import CustomButton from "@/components/ui/component-globals/button-primary"
import { router } from "expo-router"
import { useState } from "react"
import { View, TouchableOpacity, Text, StatusBar, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const EditAbout = () => {
    const [about, setAbout] = useState<string>("")

    const handleSave = () => {
        if (!about.trim()) return

        console.log("About updated:", about)
        // Here you can add the logic to save the about text, e.g., API call
        router.back() // Navigate back after saving
    }

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 20 }}>
            <StatusBar
                backgroundColor="#FFFFFF" // background putih
                barStyle="dark-content"   // ikon hitam
            />
            <View className="flex-row items-center mb-4">
                <TouchableOpacity className="me-3" onPress={() => router.back()}>
                    <CloseIcons width={15} height={15} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>Edit About</Text>
            </View>
            <View>
                <TextInput
                    value={about}
                    onChangeText={text => setAbout(text)}
                    placeholder="Write an exciting story today..."
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    className="text-[16px] text-black"
                    style={{ height: 420, padding: 10, borderWidth: 1, borderColor: '#D3D3D3', borderRadius: 12, backgroundColor: "#F9F9F9" }}
                />
            </View>
            <View style={{
                position: 'absolute',
                bottom: 120,
                left: 16,
                right: 16,
            }}>
                <CustomButton
                    title="Save"
                    onPress={handleSave}
                    className="py-[13px]"
                />
            </View>
        </SafeAreaView>
    )
}

export default EditAbout;