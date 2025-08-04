import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AboutUsScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header */}
      <LinearGradient
        colors={['#65DD9C', '#58E5D5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-14 pb-6 px-5 rounded-b-3xl"
      >
        <SafeAreaView edges={['top', 'left', 'right']}>
          <TouchableOpacity onPress={() => router.back()} className="py-2">
            <BackIcons width={24} height={24} />
          </TouchableOpacity>

          <Text className="text-black text-lg font-bold mt-3">Hello 👋</Text>
          <Text className="text-[#1E1E1E] text-sm mt-1 pr-4">
            Read first for the about us in the TaniVerse application
          </Text>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5 py-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="flex-row items-center mb-3">
          <Clock size={16} color="#A0A0A0" />
          <Text className="text-xs text-gray-400 ml-2">
            Last updated - 14 May 2025
          </Text>
        </View>

        <Text className="text-black text-[17px] font-bold mb-4">About Us</Text>

        <Text className="text-[#1E1E1E] text-justify mb-4">
          Connecting Farmers to the Future of Digital Farming
        </Text>

        <Text className="text-[#1E1E1E] text-justify mb-4">
          TaniVerse is an integrated digital platform designed to revolutionize
          the agricultural sector in Indonesia. We are here with a big mission:
          to make farming easier, more efficient, and more transparent through
          technology.
        </Text>

        <Text className="text-[#1E1E1E] text-justify mb-4">
          At TaniVerse, we believe that farmers are the backbone of the nation.
          However, they still face many challenges such as price fluctuations,
          limited market access, and lack of information. We want to change
          that.
        </Text>

        {/* Section 1 */}
        <Text className="text-[#1E1E1E] font-semibold mb-2">
          1. What Do We Offer?
        </Text>
        <Text className="text-[#1E1E1E] text-justify mb-4">
          TaniVerse is not just an application—it is a complete digital farming
          ecosystem, including:
        </Text>
        <Text className="text-[#1E1E1E] mb-4 whitespace-pre-line">
          {`• Agricultural E-Commerce: Buy and sell agricultural needs and crops directly and transparently.
• Farmer Social Media: Community for discussion, knowledge sharing, and networking.
• AI for Agriculture: Detect pests, recommend planting patterns, and predict weather.
• Real-Time Price Data: Get the latest market prices to make better decisions.
• Access to Export: Open international market access for local products.`}
        </Text>

        {/* Section 2 */}
        <Text className="text-[#1E1E1E] font-semibold mb-2">2. Our Vision</Text>
        <Text className="text-[#1E1E1E] text-justify mb-4">
          To become the leading agricultural technology platform that drives
          Indonesian agriculture towards a smart, equitable, and sustainable
          future.
        </Text>

        {/* Section 3 */}
        <Text className="text-[#1E1E1E] font-semibold mb-2">
          3. Our Mission
        </Text>
        <Text className="text-[#1E1E1E] mb-4 whitespace-pre-line">
          {`1. Facilitate farmers' access to markets and technology.
2. Increase agricultural efficiency and productivity through digitalization.
3. Empower farming communities with data and education.
4. Build an interconnected ecosystem: farmers, consumers, distributors, and government.`}
        </Text>

        {/* Section 4 */}
        <Text className="text-[#1E1E1E] font-semibold mb-2">
          4. Who Do We Serve?
        </Text>
        <Text className="text-[#1E1E1E] mb-4 whitespace-pre-line">
          {`• Individual farmers and farmer groups
• Retailers and distributors of agricultural equipment/products
• MSMEs in the agricultural sector
• Consumers who want fresh products directly from the source`}
        </Text>

        {/* Section 5 */}
        <Text className="text-[#1E1E1E] font-semibold mb-2">
          5. Let’s Grow Together
        </Text>
        <Text className="text-[#1E1E1E] text-justify mb-4">
          TaniVerse is built for you—agricultural actors, innovators, and the
          young generation who care about the future of Indonesian agriculture.
          We invite you to be part of this digital agricultural revolution.
        </Text>

        <Text className="text-[#1E1E1E] mt-6">
          🌱 Digitalization of agriculture, Realizing the Future 🌍
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutUsScreen;
