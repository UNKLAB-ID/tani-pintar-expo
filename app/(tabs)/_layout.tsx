import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import "../../global.css";
import { Text } from "react-native";

import HomeIcons from "@/assets/icons/home-icons-disable";
import HomeIconsActive from "@/assets/icons/home-icons-active";
import EcommerceIcons from "@/assets/icons/ecommerce-icons-disable";
import EcommerceIconsActive from "@/assets/icons/ecommerce-icons-active";
import AgentIcons from "@/assets/icons/agent-icons-disable ";
import AgentIconsActive from "@/assets/icons/agent-icons-active";
import ProfileIcons from "@/assets/icons/profile-icons-disable";
import ProfileIconsActive from "@/assets/icons/profile-icons-active";
import AiIcons from "@/assets/icons/ai-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "sosmed") {
            const IconComponent = focused ? HomeIconsActive : HomeIcons;
            return <IconComponent width={size} height={size} />;
          } else if (route.name === "ecommerce") {
            const IconComponent = focused
              ? EcommerceIconsActive
              : EcommerceIcons;
            return <IconComponent width={size} height={size} />;
          } else if (route.name === "ai") {
            const IconComponent = AiIcons;
            return <IconComponent width={size} height={size} />;
          } else if (route.name === "export") {
            const IconComponent = focused ? AgentIconsActive : AgentIcons;
            return <IconComponent width={size} height={size} />;
          } else if (route.name === "profile") {
            const IconComponent = focused ? ProfileIconsActive : ProfileIcons;
            return <IconComponent width={size} height={size} />;
          }
        },
        tabBarActiveTintColor: "#28a745",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarShowLabel: true,
        tabBarLabel: ({ focused, color }) => {
          let label = "";
          if (route.name === "sosmed") label = "Home";
          else if (route.name === "ecommerce") label = "E-Commerce";
          else if (route.name === "ai");
          else if (route.name === "export") label = "Agent";
          else if (route.name === "profile") label = "Profile";

          return (
            <Text
              style={{
                color,
                fontSize: 11.55,
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
