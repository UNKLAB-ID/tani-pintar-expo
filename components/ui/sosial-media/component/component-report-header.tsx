import ReportIconsHeader from '@/assets/icons/sosial-media/report/report-header-icons';
import React from 'react';
import { View, Text } from 'react-native';

interface ComponentReportHeaderProps {
  text: string;
}

const ComponentReportHeader: React.FC<ComponentReportHeaderProps> = ({
  text,
}) => {
  return (
    <View>
      <View className="w-full flex-row items-center justify-center">
        <ReportIconsHeader width={48} height={48} />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        Thanks for your report. We will follow{'\n'}
        up on it soon
      </Text>
      <Text
        className="mt-2"
        style={{
          fontSize: 14,
          fontWeight: 400,
          textAlign: 'center',
          color: '#8D8D8D',
        }}
      >
        In addition to waiting for our decision, there are other actions you can
        take at this time.
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 500,
          textAlign: 'center',
          color: '#127A42',
          marginTop: 20,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ComponentReportHeader;
