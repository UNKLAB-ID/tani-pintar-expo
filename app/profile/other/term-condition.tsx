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

const TermsAndConditionsScreen = () => {
  return (
    <View className="flex-1 bg-white">
      {/* StatusBar transparan agar gradasi kelihatan */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header dengan gradasi hingga status bar */}
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
            Read first for the terms and conditions in the TaniVerse application
          </Text>
        </SafeAreaView>
      </LinearGradient>

      {/* Konten Scroll */}
      <ScrollView
        className="flex-1 px-5 py-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Updated Info */}
        <View className="flex-row items-center mb-3">
          <Clock size={16} color="#A0A0A0" />
          <Text className="text-xs text-gray-400 ml-2">
            Last updated - 14 May 2025
          </Text>
        </View>

        <Text className="text-black text-[17px] font-bold mb-4">
          Terms & Conditions
        </Text>

        {/* Terms List */}
        {terms.map((item, index) => (
          <View key={index} className="mb-5">
            <Text className="font-bold text-black mb-1">
              {index + 1}. {item.title}
            </Text>
            <Text className="text-justify text-[#1E1E1E]">{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const terms = [
  {
    title: 'Introduction',
    content:
      'Welcome to TaniVerse! By accessing and using the TaniVerse application, you agree to be bound by the following Terms and Conditions. If you do not agree to any one of these terms, please do not use the application.',
  },
  {
    title: 'Definitions',
    content:
      'TaniVerse: A digital application that provides information, education, and community services around the world of agriculture.\nUsers: Individuals or entities that access or use TaniVerse services.',
  },
  {
    title: 'Terms of Use',
    content:
      '• Users are required to provide true and accurate information when registering.\n• Each user is responsible for the security of their account and the activities that occur within that account.\n• Use of the application must not permit illegal purposes, spam, or activities that harm other parties.',
  },
  {
    title: 'Content and Intellectual Property Rights',
    content:
      '• All content in the TaniVerse application (text, images, videos, data) is owned by TaniVerse or its official partners and is protected by copyright law.\n• Copying, distributing, modifying, or using content without written permission is prohibited.',
  },
  {
    title: 'User Content',
    content:
      '• Users can upload content (such as comments, posts, images) to the application.\n• TaniVerse has the right to remove content that is considered irrelevant, inappropriate, or misleading, without prior notice.\n• By uploading content, users grant TaniVerse non-exclusive permission to use the content for the purpose of promoting and developing the platform.',
  },
  {
    title: 'Third Party Services',
    content:
      '• TaniVerse can be integrated with third-party services (such as payment systems, map services, or education providers). We are not responsible for the content or services of such third parties.',
  },
  {
    title: 'Limitation of Liability',
    content:
      '• TaniVerse is not responsible for any loss or damage arising from misuse or negligence of the user.\n• All information and advice in the application is provided for educational and informational purposes, and is not a substitute for professional consultation.',
  },
  {
    title: 'Privacy & Data Protection',
    content:
      '• TaniVerse respects user privacy and manages personal data in accordance with the applicable Privacy Policy.\n• User data will not be shared with third parties without permission, unless required by law.',
  },
  {
    title: 'Changes to Terms',
    content:
      '• TaniVerse may update these Terms and Conditions at any time. Users are expected to check for updates regularly. Use of the application after an update is deemed to be acceptance of the changes.',
  },
  {
    title: 'Applicable Law',
    content:
      '• These Terms and Conditions are governed by the laws of the Republic of Indonesia. Disputes arising will be resolved through legal mechanisms applicable in the jurisdiction of Indonesia.',
  },
];

export default TermsAndConditionsScreen;
