import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PrivacyPolicyScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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
            Read first for the privacy policy in the TaniVerse application
          </Text>
        </SafeAreaView>
      </LinearGradient>

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

        <Text className="text-black text-[17px] font-bold mb-4">
          Privacy Policy
        </Text>

        <Text className="text-[#1E1E1E] text-justify mb-6">
          Welcome to TaniVerse! TaniVerse respects and maintains the privacy of
          every user. This Privacy Policy is created to inform you about how we
          collect, use, store, and protect your personal information when using
          our application.
        </Text>

        {policyItems.map((item, idx) => (
          <View key={idx} className="mb-5">
            <Text className="text-[#1E1E1E] font-semibold mb-1">
              {idx + 1}. {item.title}
            </Text>
            <Text className="text-[#1E1E1E] text-justify whitespace-pre-line">
              {item.content}
            </Text>
          </View>
        ))}

        <View className="mt-6">
          <Text className="text-[#1E1E1E] font-semibold mb-1">📧 Email:</Text>
          <Text
            className="text-[#1E1E1E] underline mb-2"
            onPress={() =>
              Linking.openURL('mailto:tajibat.technology@gmail.com')
            }
          >
            tajibat.technology@gmail.com
          </Text>

          <Text className="text-[#1E1E1E] font-semibold mb-1">🌐 Website:</Text>
          <Text
            className="text-[#1E1E1E] underline"
            onPress={() => Linking.openURL('https://www.taniverse.id')}
          >
            www.taniverse.id
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const policyItems = [
  {
    title: 'Information We Collect',
    content: `We may collect several types of personal and non-personal information from you, including:\n
• Personal Information: Name, email address, telephone number, location information, shipping address, and other data that you provide when registering or using our services.\n
• Transaction Data: Purchase information, transaction history, payment methods, and other details related to in-app activity.\n
• Usage Data: Information about how you use our application, including interactions, features used, and usage time.\n
• Device Information: Device type, operating system, IP address, and other technical data that helps us improve the performance of the application.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information collected to:\n
• Provide services optimally and according to user needs.\n
• Process transactions and facilitate product delivery.\n
• Provide notifications, updates, or important information related to your account and activities.\n
• Explaining new features and improving the quality of the application.\n
• Detecting and preventing suspicious activity or policy violations.\n
• Providing faster and more effective customer support.`,
  },
  {
    title: 'Data Protection',
    content: `We use technical and organizational security measures to protect your personal information from unauthorized access, use, or disclosure. All your data is stored encrypted and can only be accessed by authorized parties.`,
  },
  {
    title: 'Information Sharing',
    content: `We will not sell, rent, or share your personal information with third parties without your permission, except:\n
• Necessary to complete a transaction (for example to a courier/logistics party).\n
• Required by law, government, or government agency.\n
• Necessary to protect the rights, property, or safety of our users and systems.`,
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: `We use cookies and similar technologies to understand user behavior, analyze trends, and better administer the application. You can manage your cookie preferences through your device settings.`,
  },
  {
    title: 'User Rights',
    content: `As a TaniVerse user, you have the right to:\n
• Access and update your personal information.\n
• Request deletion of your account and personal data.\n
• Opt out of the collection of certain data (with the consequence of certain service insurance).\n
• Withdraw consent to the use of certain data at any time.`,
  },
  {
    title: 'Policy Changes',
    content: `We may change this Privacy Policy from time to time. Any changes will be communicated via the application or email. We encourage you to review this policy periodically.`,
  },
  {
    title: 'Contact Us',
    content: `If you have any questions, suggestions, or requests regarding this privacy policy, please contact us.`,
  },
];

export default PrivacyPolicyScreen;
