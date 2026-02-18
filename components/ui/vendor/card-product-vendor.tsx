import { Image, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AlertStockVendorIcons from "@/assets/icons/vendor/alert-stock";

interface CardProductVendorProps {
    productName?: string;
    price?: string;
    stock?: number;
    status?: 'active' | 'inactive';
    condition?: 'new' | 'used';
    imageUrl?: any;
    rating?: number;
    onEdit?: () => void;
}

const CardProductVendor: React.FC<CardProductVendorProps> = ({
    productName = "PUPUK NPK MUTIARA 16-16-16 1 KG",
    price = "Rp24.192",
    stock = 0,
    status = 'inactive',
    condition = 'new',
    imageUrl = require("../../../assets/images/trash/image18.png"),
    rating = 5.0,
    onEdit
}) => {
    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 16,
        }}>
            {/* Image Section with Badge */}
            <View style={{
                position: 'relative',

                borderRadius: 12,
                overflow: 'hidden',
            }}>
                <Image
                    source={imageUrl}
                    style={{
                        width: '100%',
                        height: 140,
                        resizeMode: 'cover',
                    }}
                />
            </View>

            {/* Content Section */}
            <View style={{ padding: 12 }}>
                {/* Condition Badge */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                    backgroundColor: condition === 'new' ? '#E8F5E9' : '#FFF8EA',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 20,
                    gap: 6,
                    // width: "35%"
                }}>
                    <Ionicons name="checkmark-circle" size={18} color={condition === 'new' ? "#169953" : "#CA9325"} />
                    <Text style={{
                        fontSize: 12,
                        color: condition === 'new' ? "#169953" : "#CA9325",
                        fontWeight: '600',
                    }}>
                        {condition === 'new' ? 'Kondisi Baru' : 'Kondisi Bekas'}
                    </Text>
                </View>

                {/* Product Name */}
                <View style={{ height: 36, marginBottom: 4 }}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#1F1F1F',
                            lineHeight: 18,
                        }}
                    >
                        {productName}
                    </Text>
                </View>

                {/* Price */}
                <Text style={{
                    fontSize: 12,
                    marginBottom: 8,
                }}>
                    {price}
                </Text>

                {/* Stock and Status */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: '#6F6F6F',
                        }}>
                            Stok: {stock}
                        </Text>
                        {stock === 0 && (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                            }}>
                                <AlertStockVendorIcons width={16} height={16} />
                            </View>
                        )}
                    </View>
                    <View style={{
                        backgroundColor: status === 'active' ? '#E8F5E9' : '#E9E9E9',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 20,
                    }}>
                        <Text style={{
                            fontSize: 11,
                            color: status === 'active' ? '#169953' : '#8D8D8D',
                            fontWeight: '600',
                        }}>
                            {status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </Text>
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    onPress={onEdit}
                    style={{
                        borderWidth: 1.5,
                        borderColor: '#169953',
                        borderRadius: 30,
                        paddingVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#169953',
                    }}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CardProductVendor;
