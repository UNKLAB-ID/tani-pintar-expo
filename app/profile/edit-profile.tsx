import BackIcons from '@/assets/icons/global/back-icons';
import BottomTextInputModal from '@/components/ui/component-globals/modal-input';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  birthDate: string;
};
const EditProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [editedName, setEditedName] = useState('');

  const maskPhone = (phone: string) => {
    return phone.replace(/(\+62)\s\d{3}-\d{4}/, '$1 ****-****');
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    const maskedName =
      name.slice(0, 2) + '*'.repeat(Math.max(name.length - 2, 0));
    return `${maskedName}@${domain}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulasi fetch (ganti dengan real API)
        const dummyData: User = {
          name: 'Mambaus Baus',
          email: 'baus@gmail.com',
          phone: '+62 812-3456-7890',
          avatar: 'https://i.pravatar.cc/100',
          gender: 'Male',
          birthDate: 'Not yet determined',
        };

        setTimeout(() => {
          setUser(dummyData);
          setEditedName(dummyData.name);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // //   if (loading || !user) {
  // //     return (
  // //       <View className="flex-1 justify-center items-center">
  // //         <ActivityIndicator size="large" color="#5AD598" />
  // //       </View>
  // //     );
  // }

  const handleNameSave = (newName: string) => {
    setEditedName(newName);
    if (user) {
      setUser({ ...user, name: newName });
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
      <View className="bg-[#f8f8f8]">
        <View className="flex-row bg-white items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} fill="#000" />
          </TouchableOpacity>
          <Text className="text-black text-[16px] font-bold ml-2">
            Edit Profile
          </Text>
        </View>
        <View className="flex-row mt-3 bg-white p-4 ">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[80px] h-[80px] rounded-full mr-4"
          />
          <View className=" flex-1 p-3 justify-center">
            <TouchableOpacity className="w-[175px] border border-[#AAAAAA] justify-center p-4 rounded-xl ">
              <Text className="text-primary text-[14px] text-center font-semibold">
                Change Profile Photo
              </Text>
            </TouchableOpacity>

            <Text className="text-[#B3B3B3] text-[12px] mt-2">
              At least 800x800 px recommended,{'\n'}
              JPG or PNG is allowed
            </Text>
          </View>
        </View>
        <View className="mt-3 bg-white">
          <View className="p-4">
            <Text className="text-[#6F6F6F] font-semibold text-[14px]">
              Profile
            </Text>
            <TouchableOpacity
              onPress={() => setShowNameModal(true)}
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">Full Name</Text>
                <View className="flex-1" />
                <Text className="text-[#AAAAAA] text-[14px] mr-4">
                  {user?.name}
                </Text>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile/new-email')}
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">Email</Text>
                <View className="flex-1" />
                <Text className="text-[#AAAAAA] text-[14px] mr-4">
                  {user?.email ? maskEmail(user.email) : ''}
                </Text>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">Phone</Text>
                <View className="flex-1" />
                <Text className="text-[#AAAAAA] text-[14px] mr-4">
                  {user?.phone ? maskPhone(user.phone) : ''}
                </Text>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">Gender</Text>
                <View className="flex-1" />
                <Text className="text-[#AAAAAA] text-[14px] mr-4">
                  {user?.gender}
                </Text>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">
                  Date of Birth
                </Text>
                <View className="flex-1" />
                <Text className="text-[#AAAAAA] text-[14px] mr-4">
                  {user?.birthDate}
                </Text>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
              className=" p-3 mt-2"
            >
              <View className="flex-row items-center">
                <Text className="text-[#6F6F6F] text-[14px]">
                  Social Media Accounts
                </Text>
                <View className="flex-1" />
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomTextInputModal
        visible={showNameModal}
        title="Full Name"
        placeholder="Enter your full name"
        value={editedName}
        onChange={handleNameSave}
        onClose={() => setShowNameModal(false)}
        confirmLabel="Save"
        defaultOpenText="Enter full name"
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
