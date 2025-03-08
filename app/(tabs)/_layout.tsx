import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import "../../global.css";

export default function Layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = "";
                    if (route.name === "sosmed") iconName = "home";
                    else if (route.name === "ecommerce") iconName = "cart";
                    else if (route.name === "ai") iconName = "bulb";
                    else if (route.name === "export") iconName = "cube";
                    else if (route.name === "profile") iconName = "person";

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#28a745",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { height: 60, paddingBottom: 10 },
                tabBarShowLabel: true,
                headerShown: false,
            })}
        >
            <Tabs.Screen name="sosmed" options={{ title: "Sosmed" }} />
            <Tabs.Screen name="ecommerce" options={{ title: "E-Commerce" }} />
            <Tabs.Screen name="ai" options={{ title: "AI" }} />
            <Tabs.Screen name="export" options={{ title: "Export" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
