import { Tabs } from 'expo-router';
import '../../global.css';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import HomeIcons from '@/assets/icons/navbar/home-icons-disable';
import HomeIconsActive from '@/assets/icons/navbar/home-icons-active';
import EcommerceIcons from '@/assets/icons/navbar/ecommerce-icons-disable';
import EcommerceIconsActive from '@/assets/icons/navbar/ecommerce-icons-active';
import AgentIcons from '@/assets/icons/navbar/agent-icons-disable';
import AgentIconsActive from '@/assets/icons/navbar/agent-icons-active';
import ProfileIcons from '@/assets/icons/navbar/profile-icons-disable';
import ProfileIconsActive from '@/assets/icons/navbar/profile-icons-active';
import AiIcons from '@/assets/icons/navbar/ai-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth/role';
import ShopVendorIcon from '@/assets/icons/vendor/shop-icon';
import ShopVendorActiveIcon from '@/assets/icons/vendor/shop-icon-active';

export default function Layout() {
  const insert = useSafeAreaInsets();

  const { role } = useAuthStore();
  return (
    <SafeAreaView style={[styles.container, { marginTop: insert.top }]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === 'sosmed') {
              const IconComponent = focused ? HomeIconsActive : HomeIcons;
              return <IconComponent width={size} height={size} />;
            } else if (route.name === 'ecommerce') {
              const IconComponent = focused
                ? EcommerceIconsActive
                : EcommerceIcons;
              return <IconComponent width={size} height={size} />;
            } else if (route.name === 'ai') {
              if (role === 'tani') {
                const IconComponent = AiIcons;
                return (
                  <View
                    style={{
                      backgroundColor: '#169953',
                      borderRadius: 100,
                      padding: 18,
                      marginBottom: 27,
                    }}
                  >
                    <IconComponent width={size} height={size} />
                  </View>
                );
              } else {
                const IconComponent = focused
                  ? ShopVendorActiveIcon
                  : ShopVendorIcon;
                return <IconComponent width={size} height={size} />;
              }
            } else if (route.name === 'export') {
              const IconComponent = focused ? AgentIconsActive : AgentIcons;
              return <IconComponent width={size} height={size} />;
            } else if (route.name === 'profile') {
              const IconComponent = focused ? ProfileIconsActive : ProfileIcons;
              return <IconComponent width={size} height={size} />;
            }
          },
          tabBarActiveTintColor: '#169953',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            marginBottom: insert.bottom,
            height: 63,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            // position: "absolute",
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 10,
          },
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => {
            let label = '';
            if (route.name === 'sosmed') label = 'Home';
            else if (route.name === 'ecommerce') label = 'E-Commerce';
            else if (route.name === 'ai') label = role === 'tani' ? '' : 'Shop';
            else if (route.name === 'export') label = 'Agent';
            else if (route.name === 'profile') label = 'Profile';

            return (
              <Text
                style={{
                  color,
                  fontSize: 11.55,
                  fontWeight: focused ? 'bold' : 'normal',
                }}
              >
                {label}
              </Text>
            );
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen name="sosmed" options={{ title: 'Sosmed' }} />
        <Tabs.Screen name="ecommerce" options={{ title: 'E-Commerce' }} />
        <Tabs.Screen name="ai" options={{ title: 'AI' }} />
        <Tabs.Screen name="export" options={{ title: 'Export' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Warna latar belakang default
  },
});
