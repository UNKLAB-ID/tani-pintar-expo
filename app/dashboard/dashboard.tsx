import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import CreateProductIcons from '@/assets/icons/dashboard/create-product-icons';
import NotificationDashboardIcons from '@/assets/icons/dashboard/notification-icons';
import MenuDashboard from '@/components/ui/dashboard/menu-dashboard';
import AnalisisDashboard from '@/components/ui/dashboard/analisis-dashboard';

const DashboardScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.color.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() =>
                router.push('/sosial-media/profile-sosial-media?query=profile')
              }
            >
              <Image
                source={require('../../assets/images/profile-default.png')}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.text.primary }}>
                MAMBAUS STORE
              </Text>
              <Text style={{ fontSize: 12, color: Colors.text.secondary }}>
                Vendor Dashboard
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity style={{ padding: 8 }} onPress={() => router.push("/vendor/list-product")}>
              <CreateProductIcons />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8 }}>
              <NotificationDashboardIcons />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View>
          <MenuDashboard />

          <AnalisisDashboard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
