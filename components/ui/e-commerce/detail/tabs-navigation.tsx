import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ShoppingBag, StarIcon } from 'lucide-react-native';
import AddressIcon from '@/assets/icons/global/address-icon';

type Tab = {
  id: string;
  // Add other tab properties if needed
};

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
};

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  const renderIcon = (tab: Tab, isActive: boolean) => {
    const iconColor = isActive ? '#10B981' : '#787878';
    const strokeWidth = isActive ? 2.5 : 2;

    switch (tab.id) {
      case 'product':
        return <AddressIcon width={24} height={24} color={iconColor} />;
      case 'category':
        return (
          <ShoppingBag size={24} color={iconColor} strokeWidth={strokeWidth} />
        );
      case 'rating':
        return (
          <StarIcon size={24} color={iconColor} strokeWidth={strokeWidth} />
        );
      default:
        return null;
    }
  };

  return (
    <View
      className="flex-row justify-around bg-white border-b"
      style={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderColor: '#E5E7EB',
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            className="py-4 px-6 relative"
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            {renderIcon(tab, isActive)}

            {/* Active indicator */}
            {isActive && (
              <View
                className="absolute bottom-0 left-1/2 bg-[#10B981] rounded-full"
                style={{
                  width: 32,
                  height: 2,
                  left: '60%',
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabNavigation;
