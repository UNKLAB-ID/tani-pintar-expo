import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <Slot />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
