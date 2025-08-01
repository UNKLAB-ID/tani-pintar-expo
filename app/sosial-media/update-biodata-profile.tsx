import CloseIcons from '@/assets/icons/global/close-icons';
import CustomButton from '@/components/ui/component-globals/button-primary';
import CustomTextInput from '@/components/ui/component-globals/input-text';
import ModalCancel from '@/components/ui/sosial-media/modal-cancel';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '@/store/location/location';

const UpdateBiodataProfile = () => {
  const { selectedCity, selectedCountry } = useUserLocation();
  const [modalCancel, setModalCancel] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      headline: '',
      farme_community: '',
    },
  });

  const handlerEditProfile = (data: {
    name: string;
    headline: string;
    farme_community: string;
  }) => {
    // Simulate API call
    console.log('Profile updated with data:', data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        backgroundColor="#FFFFFF" // background putih
        barStyle="dark-content" // ikon hitam
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => setModalCancel(true)}
              className="flex-row items-center justify-center"
              style={{ marginEnd: 12 }}
            >
              <CloseIcons width={15} height={15} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Edit Profile
            </Text>
          </View>

          {/* Information */}
          <View style={{ marginBottom: 20, marginTop: 15 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, color: '#000' }}>
              Information
            </Text>
            <Text style={{ fontWeight: '400', fontSize: 12, color: '#AAAAAA' }}>
              Required Fields*
            </Text>
          </View>

          {/* Name */}
          <View className="mb-4">
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Name is required' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  value={value}
                  label="Name*"
                  error={!!error}
                  placeholder="Fill in your full name"
                  onChangeText={onChange}
                  labelColor="#1F1F1F"
                  fontWheight="400"
                  fontSize={14}
                />
              )}
            />
          </View>

          {/* Headline */}
          <View className="mb-4">
            <Controller
              control={control}
              name="headline"
              rules={{ required: 'Headline is required' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  value={value}
                  label="Headline*"
                  error={!!error}
                  placeholder="Fill in your headline"
                  onChangeText={onChange}
                  labelColor="#1F1F1F"
                  fontWheight="400"
                  fontSize={14}
                />
              )}
            />
          </View>

          {/* Community */}
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#000',
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            Community
          </Text>
          <View className="mb-4">
            <Controller
              control={control}
              name="farme_community"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  value={value}
                  label="Farme Community*"
                  error={!!error}
                  placeholder="Fill in your farmer community"
                  onChangeText={onChange}
                  labelColor="#1F1F1F"
                  fontWheight="400"
                  fontSize={14}
                />
              )}
            />
          </View>

          {/* Location */}
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#000',
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            Location
          </Text>

          {/* Country */}
          <Text
            style={{
              fontWeight: '400',
              fontSize: 14,
              color: '#1F1F1F',
              marginBottom: 5,
            }}
          >
            Country / region*
          </Text>
          <View className="mb-4">
            <TouchableOpacity
              onPress={() =>
                router.push('/sosial-media/address/location-country')
              }
              style={{
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderColor: '#AAAAAA',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: selectedCountry ? '#000' : '#AAA',
                }}
              >
                {selectedCountry?.name || 'Ex : Indonesia'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* City */}
          <Text
            style={{
              fontWeight: '400',
              fontSize: 14,
              color: '#1F1F1F',
              marginBottom: 5,
            }}
          >
            City*
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/sosial-media/address/location-city')}
            style={{
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderColor: '#AAAAAA',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: selectedCity ? '#000' : '#AAA',
              }}
            >
              {selectedCity?.name || 'Fill in your city'}
            </Text>
          </TouchableOpacity>

          {/* Save Button */}
          <View style={{ marginTop: 30 }}>
            <CustomButton
              title="Save"
              onPress={handleSubmit(handlerEditProfile)}
              className="py-[12px]"
              fontSize={16}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {modalCancel && (
        <ModalCancel
          setShowDiscardModal={setModalCancel}
          desciption="These changes will be lost if you exit. Are you sure you want to continue?"
          headerDescription="Discard changes"
          textButtonLeft="Discard"
          textButtonRight="No, thanks"
          path={'/sosial-media/profile-sosial-media?query=profile'}
        />
      )}
    </SafeAreaView>
  );
};

export default UpdateBiodataProfile;
