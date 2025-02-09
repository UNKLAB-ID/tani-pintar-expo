import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login");
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={require("../assets/LOGO ICON white.png")}
                    style={styles.logo}
                    resizeMode="contain"
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
        width: "80%",
    },
    logo: {
        width: 200,
        height: 273,
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
