import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

const VendorScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/ecommerce')}>
        <BackIcons width={24} height={24} />
      </TouchableOpacity>

      <Text>Vendor Home Page</Text>
    </View>
  );
};

export default VendorScreen;
