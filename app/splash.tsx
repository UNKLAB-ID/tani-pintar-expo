import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
                <Ionicons name="leaf-outline" size={250} color="#fff" />
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
    },
    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
    },
});

export default SplashScreen;
