import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';

interface WebContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

/**
 * WebContainer component for mobile-like width on web
 */
export const WebContainer: React.FC<WebContainerProps> = ({
  children,
  style,
  className,
}) => {
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          {
            maxWidth: 414, // Mobile-like width
            width: '100%',
            marginHorizontal: 'auto',
          } as ViewStyle,
          style,
        ]}
        className={className}
      >
        {children}
      </View>
    );
  }
  // On mobile, render children directly
  return <>{children}</>;
};

export default WebContainer;
