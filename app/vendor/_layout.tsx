import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ShopVendorIcon from '@/assets/icons/vendor/shop-icon';
import HomeIcons from '@/assets/icons/navbar/home-icons-disable';
import HomeIconsActive from '@/assets/icons/navbar/home-icons-active';
import EcommerceIcons from '@/assets/icons/navbar/ecommerce-icons-disable';
import EcommerceIconsActive from '@/assets/icons/navbar/ecommerce-icons-active';
import AgentIcons from '@/assets/icons/navbar/agent-icons-disable ';
import AgentIconsActive from '@/assets/icons/navbar/agent-icons-active';
import ProfileIcons from '@/assets/icons/navbar/profile-icons-disable';
import ProfileIconsActive from '@/assets/icons/navbar/profile-icons-active';

export default function VendorLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { marginTop: insets.top }]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case 'home':
                return focused ? <HomeIconsActive /> : <HomeIcons />;
              case 'ecommerce':
                return focused ? <EcommerceIconsActive /> : <EcommerceIcons />;
              case 'shop':
                return <ShopVendorIcon />;
              case 'agent':
                return focused ? <AgentIconsActive /> : <AgentIcons />;
              case 'profile':
                return focused ? <ProfileIconsActive /> : <ProfileIcons />;
              default:
                return null;
            }
          },
          tabBarActiveTintColor: '#28a745',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            marginBottom: insets.bottom,
            height: 63,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 10,
          },
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => {
            const labels: Record<string, string> = {
              home: 'Home',
              ecommerce: 'E-Commerce',
              shop: 'Shop',
              agent: 'Agent',
              profile: 'Profile',
            };

            return (
              <Text
                style={{
                  color,
                  fontSize: 11,
                  fontWeight: focused ? 'bold' : 'normal',
                }}
              >
                {labels[route.name] || ''}
              </Text>
            );
          },
          headerShown: false,
        })}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="ecommerce" options={{ title: 'E-Commerce' }} />
        <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
        <Tabs.Screen name="agent" options={{ title: 'Agent' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
