import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Clipboard,
} from 'react-native';
import { X } from 'lucide-react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { Copy } from 'lucide-react-native';
import { useState } from 'react';
import WhatsAppIcon from '@/assets/icons/profile/whatsapp-icon';
import FacebookIcons from '@/assets/icons/global/facebook-icons';
import InstragamIcons from '@/assets/icons/global/instragam-icons';
import TelegramIcons from '@/assets/icons/global/telegram-icons';
import MessengerIcons from '@/assets/icons/global/messenger-icons';

interface ModalShareLinkProps {
  visible: boolean;
  onClose: () => void;
}
const ModalShareLink: React.FC<ModalShareLinkProps> = ({
  visible,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const link = 'https://www.taniverse.id/tani-pay-request-money/uqwqeewewq';

  const handleCopyLink = () => {
    Clipboard.setString(link);
    setCopiedLink(true);

    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  };
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <View className="mx-3 items-center">
            <RectangleIcon width={84} height={4} />
          </View>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              Share link
            </Text>
          </View>
          <View className="border-b border-gray-200 pb-4 mb-4">
            <TouchableOpacity
              className="p-4 rounded-lg bg-[#f8f8f8] flex-row items-center justify-between"
              onPress={handleCopyLink}
            >
              <Text
                numberOfLines={1}
                className="flex-1 mr-2 text-[14px] text-[#6F6F6F]"
              >
                {link}
              </Text>
              <Copy size={14} color="#1f1f1f" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={handleCopyLink}
              className="items-center mr-6"
            >
              <View
                className="border rounded-full border-gray-300 bg-[#f8f8f8] items-center justify-center"
                style={{ width: 40, height: 40 }}
              >
                <WhatsAppIcon width={20} height={20} color="#000" />
              </View>
              <Text className="mt-2 text-sm text-[#1f1f1f]">WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopyLink}
              className="items-center mr-6"
            >
              <View
                className="border rounded-full border-gray-300 bg-[#f8f8f8] items-center justify-center"
                style={{ width: 40, height: 40 }}
              >
                <FacebookIcons width={20} height={20} color="#000" />
              </View>
              <Text className="mt-2 text-sm text-[#1f1f1f]">Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopyLink}
              className="items-center mr-6"
            >
              <View
                className="border rounded-full border-gray-300 bg-[#f8f8f8] items-center justify-center"
                style={{ width: 40, height: 40 }}
              >
                <InstragamIcons width={20} height={20} color="#000" />
              </View>
              <Text className="mt-2 text-sm text-[#1f1f1f]">Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopyLink}
              className="items-center mr-6"
            >
              <View
                className="border rounded-full border-gray-300 bg-[#f8f8f8] items-center justify-center"
                style={{ width: 40, height: 40 }}
              >
                <TelegramIcons width={20} height={20} color="#000" />
              </View>
              <Text className="mt-2 text-sm text-[#1f1f1f]">Telegram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopyLink}
              className="items-center mr-6"
            >
              <View
                className="border rounded-full border-gray-300 bg-[#f8f8f8] items-center justify-center"
                style={{ width: 40, height: 40 }}
              >
                <MessengerIcons width={20} height={20} color="#000" />
              </View>
              <Text className="mt-2 text-sm text-[#1f1f1f]">Messenger</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalShareLink;
