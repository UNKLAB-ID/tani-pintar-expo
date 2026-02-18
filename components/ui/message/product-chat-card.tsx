import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import LoveIcons from '@/assets/icons/global/love-icons';

export interface ProductChatData {
  id: string;
  name: string;
  price: string;
  unit?: string;
  image: ImageSourcePropType;
}

interface ProductChatCardProps {
  product: ProductChatData;
  showBuyButton?: boolean;
  showWishlist?: boolean;
  onBuyPress?: () => void;
  onWishlistPress?: () => void;
  onPress?: () => void;
  variant?: 'in-chat' | 'attachment';
}

/**
 * Reusable Product Card untuk Chat/Message
 *
 * @param product - Data produk yang akan ditampilkan
 * @param showBuyButton - Menampilkan tombol Buy Now (default: true untuk in-chat)
 * @param showWishlist - Menampilkan icon wishlist (default: true untuk in-chat)
 * @param onBuyPress - Callback saat tombol Buy ditekan
 * @param onWishlistPress - Callback saat wishlist ditekan
 * @param onPress - Callback saat card ditekan
 * @param variant - 'in-chat' untuk dalam chat, 'attachment' untuk preview attachment
 */
const ProductChatCard: React.FC<ProductChatCardProps> = ({
  product,
  showBuyButton = true,
  showWishlist = true,
  onBuyPress,
  onWishlistPress,
  onPress,
  variant = 'in-chat',
}) => {
  const isAttachment = variant === 'attachment';

  const CardContent = () => (
    <View
      className={`bg-white rounded-xl p-3 ${isAttachment ? '' : 'mb-2'}`}
      style={{
        maxWidth: isAttachment ? '75%' : '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: isAttachment ? 2 : 1 },
        shadowOpacity: isAttachment ? 0.1 : 0.1,
        shadowRadius: isAttachment ? 4 : 2,
        elevation: isAttachment ? 3 : 2,
      }}
    >
      <View className="flex-row">
        <Image
          source={product.image}
          className={
            isAttachment ? 'w-14 h-14 rounded-lg' : 'w-20 h-20 rounded-lg'
          }
          resizeMode="cover"
        />
        <View className="flex-1 ml-3 justify-center">
          <Text numberOfLines={1} className="font-semibold text-[14px]">
            {product.name}
          </Text>
          {product.unit && (
            <Text className="text-gray-500 text-[12px] mt-1">
              {product.unit}
            </Text>
          )}
          <Text
            className={`font-semibold text-[14px] mt-1 ${isAttachment ? 'text-primary' : 'text-black'}`}
          >
            {product.price}
          </Text>
        </View>
        {showWishlist && !isAttachment && (
          <TouchableOpacity onPress={onWishlistPress} className="ml-2">
            <LoveIcons width={20} height={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      {showBuyButton && !isAttachment && (
        <TouchableOpacity
          onPress={onBuyPress}
          className="bg-white border border-primary rounded-full py-2 mt-3"
        >
          <Text className="text-primary text-center font-semibold text-[14px]">
            Buy Now
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

export default ProductChatCard;
