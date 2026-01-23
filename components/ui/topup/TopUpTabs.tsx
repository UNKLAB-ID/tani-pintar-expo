import { View, Text, TouchableOpacity } from 'react-native';

/* ================= TYPES ================= */

type TabItem<T extends string> = {
  key: T;
  label: string;
};

type Props<T extends string> = {
  tabs: readonly TabItem<T>[];
  activeTab: T;
  onChangeTab: (tab: T) => void;
};

/* ================= COMPONENT ================= */

export default function TopUpTabs<T extends string>({
  tabs,
  activeTab,
  onChangeTab,
}: Props<T>) {
  return (
    <View className="flex-row mt-6 px-4 border-b border-gray-200">
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChangeTab(tab.key)}
            className="mr-6 pb-3"
            style={{
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: '#169953',
            }}
          >
            <Text
              className={`text-sm ${
                isActive ? 'text-primary font-medium' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
