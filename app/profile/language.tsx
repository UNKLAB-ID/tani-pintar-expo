import BackIcons from '@/assets/icons/global/back-icons';
import EnglishIcon from '@/assets/icons/profile/english-icon';
import IndonesiaIcon from '@/assets/icons/profile/indonesia-icon';
import { router } from 'expo-router';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageStore } from '@/store/language/language-store';
import { useTranslate } from '@/i18n';

const LanguageScreen = () => {
  const t = useTranslate();
  const { language, setLanguage } = useLanguageStore();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center p-4"
        style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
      >
        <TouchableOpacity onPress={() => router.replace('/profile')}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          {t('selectLanguage')}
        </Text>
      </View>

      {/* Content */}
      <View className="mt-1 p-4">
        <View className="border border-gray-300 p-4 rounded-xl">
          {/* Indonesia */}
          <View
            className="flex-row items-center pb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
          >
            <IndonesiaIcon width={20} height={15} />
            <Text className="text-[14px] font-medium ml-2">
              {t('indonesia')}
            </Text>
            <View className="flex-1" />

            <Pressable onPress={() => setLanguage('id')}>
              <View
                className={`w-5 h-5 rounded-md border-2 ${
                  language === 'id'
                    ? 'bg-primary border-primary'
                    : 'border-[#DEDEDE]'
                } items-center justify-center`}
              >
                {language === 'id' && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
            </Pressable>
          </View>

          {/* English */}
          <View className="flex-row items-center pt-4">
            <EnglishIcon width={20} height={15} />
            <Text className="text-[14px] font-medium ml-2">{t('english')}</Text>
            <View className="flex-1" />

            <Pressable onPress={() => setLanguage('en')}>
              <View
                className={`w-5 h-5 rounded-md border-2 ${
                  language === 'en'
                    ? 'bg-primary border-primary'
                    : 'border-[#DEDEDE]'
                } items-center justify-center`}
              >
                {language === 'en' && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;
