import ComponentFormIndividuChangeRole from "@/components/ui/profile/change-role/componen-form-individu"
import ModalAddressDropdown from "@/components/ui/profile/change-role/modal-address-dropdown"
import { useEffect, useState } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const RegisterRoleUser = () => {
    const [toggleButton, setToggleButton] = useState<boolean>(false)
    const [toggleAddres, setToggleAddress] = useState<boolean>(false);
    const [behavior, setBehavior] = useState<"padding" | "height" | undefined>(Platform.OS === "ios" ? "padding" : "height");
    const insets = useSafeAreaInsets()

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => {
            setBehavior(Platform.OS === "ios" ? "padding" : "height");
        });
        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            setBehavior(undefined); // reset pas keyboard ditutup
        });
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: insets.top, marginBottom: insets.bottom, backgroundColor: '#fff' }}>
            <StatusBar barStyle="light-content" backgroundColor="#169953" />
            <KeyboardAvoidingView
                behavior={behavior}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 10}
            >
                <ScrollView>
                    <View style={{ paddingVertical: 40, backgroundColor: '#169953' }}>
                        <Text style={{ color: "#fff", fontSize: 24, fontWeight: 600, textAlign: "center" }}>
                            Daftar mudah buka toko{"\n"}
                            dengan cepat di Tani Verse!
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: 400, textAlign: "center", marginTop: 10 }}>
                            Silahkan lengkapi data toko kamu untuk bergabung dengan Tani Verse
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                            marginHorizontal: 13,
                            borderRadius: 33,
                            paddingVertical: 5,
                            paddingHorizontal: 2,
                            backgroundColor: '#fff',
                            overflow: 'hidden', // 🔥 penting
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setToggleButton(false)}
                            style={{
                                flex: 1,
                                borderRadius: 33,
                                paddingVertical: 14,
                                backgroundColor: toggleButton ? '#fff' : '#D7FCE8',
                                marginHorizontal: 4,
                            }}
                        >
                            <Text style={{ color: toggleButton ? '#6F6F6F' : '#169953', textAlign: 'center', fontWeight: 500, fontSize: 14 }}>
                                Individu
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setToggleButton(true)}
                            style={{
                                flex: 1,
                                borderRadius: 33,
                                paddingVertical: 14,
                                backgroundColor: toggleButton ? '#D7FCE8' : '#fff',
                                marginHorizontal: 4,
                            }}
                        >
                            <Text style={{ color: toggleButton ? '#169953' : '#6F6F6F', textAlign: 'center', fontWeight: 500, fontSize: 14 }}>
                                Perusahaan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <ComponentFormIndividuChangeRole
                            togglePerusahaanAtauIndividu={toggleButton}
                            setToggleModalAddress={setToggleAddress}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {
                toggleAddres && (
                    <ModalAddressDropdown
                        modalAddress={toggleAddres}
                        setModalAddress={setToggleAddress}
                    />
                )
            }
        </SafeAreaView>
    )
}

export default RegisterRoleUser