import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login"); // Auto-pindah ke Login setelah 2 detik
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={require("../assets/LOGO ICON white.png")}
                    style={styles.logo}
                    resizeMode="contain" // Pastikan logo tidak terpotong
                />
                <Text style={styles.title}>TANI PINTAR</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D5c32",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%", // Pastikan logo tidak terlalu melebar
    },
    logo: {
        width: 200, // Sesuaikan ukuran agar tetap proporsional
        height: 273, // Menjaga rasio aspek 401x547
    },
    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
    },
});

export default SplashScreen;
