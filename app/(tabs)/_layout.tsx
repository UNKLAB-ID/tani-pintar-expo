import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import "../../global.css";
import { Text } from "react-native";

export default function Layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName = "";
                    if (route.name === "sosmed") iconName = "home-outline";
                    else if (route.name === "ecommerce")
                        iconName = "cart-outline";
                    else if (route.name === "ai") iconName = "bulb-outline";
                    else if (route.name === "export") iconName = "cube-outline";
                    else if (route.name === "profile")
                        iconName = "person-outline";

                    if (focused) {
                        if (route.name === "sosmed") iconName = "home";
                        else if (route.name === "ecommerce") iconName = "cart";
                        else if (route.name === "ai") iconName = "bulb";
                        else if (route.name === "export") iconName = "cube";
                        else if (route.name === "profile") iconName = "person";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#28a745",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { height: 60, paddingBottom: 10 },
                tabBarShowLabel: true,
                tabBarLabel: ({ focused, color }) => {
                    let label = "";
                    if (route.name === "sosmed") label = "Home";
                    else if (route.name === "ecommerce") label = "E-Commerce";
                    else if (route.name === "ai") label = "AI";
                    else if (route.name === "export") label = "Export";
                    else if (route.name === "profile") label = "Account";

                    return (
                        <Text
                            style={{
                                color,
                                fontSize: 12,
                                fontWeight: focused ? "bold" : "normal",
                            }}
                        >
                            {label}
                        </Text>
                    );
                },
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
