import MessageDashboardIcons from "@/assets/icons/dashboard/message-icons";
import MoneySecrettsIcons from "@/assets/icons/dashboard/money-secrets-icons";
import NewOrdersDashboardIcons from "@/assets/icons/dashboard/new-orders-icons";
import NewReviewsDashboardIcons from "@/assets/icons/dashboard/new-reviews-icons";
import ReadytoShipDashboardIcons from "@/assets/icons/dashboard/ready-to-ship-icons";
import SeeMoneyIcons from "@/assets/icons/dashboard/see-money-icons";
import { useState } from "react";
import { View, ImageBackground, Text, TouchableOpacity, Dimensions } from "react-native";
import CardDashboard from "./card-dashboard";

const { width: screenWidth } = Dimensions.get('window');

const MenuDashboard = () => {
    const [secretsMoneyVisible, setSecretsMoneyVisible] = useState<boolean>(false);

    // Responsive sizing based on screen width
    const cardWidth = screenWidth - 32; // Full width minus horizontal padding
    const cardHeight = Math.max(cardWidth * 0.3, 110); // Maintain aspect ratio with minimum height

    // Responsive font sizes
    const titleFontSize = screenWidth > 375 ? 14 : 12;
    const amountFontSize = screenWidth > 375 ? 28 : 24;
    const borderRadiusSize = screenWidth > 375 ? 16 : 12;
    const horizontalPadding = screenWidth * 0.04; // 4% of screen width
    const verticalPadding = screenWidth * 0.04; // 4% of screen width

    const dataMenu = [
        { id: 1, label: 'Pesanan baru', number: 5, icon: <NewOrdersDashboardIcons /> },
        { id: 2, label: 'Siap dikirim', number: 3, icon: <ReadytoShipDashboardIcons /> },
        { id: 3, label: 'Chat baru', number: 8, icon: <MessageDashboardIcons /> },
        { id: 4, label: 'Ulasan baru', number: 20, icon: <NewReviewsDashboardIcons /> },
    ];

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <View style={{
                width: cardWidth,
                borderRadius: borderRadiusSize,
                overflow: 'hidden',
                marginTop: 16,
            }}>
                <ImageBackground
                    source={require('../../../assets/images/bg-money-dashboard.png')}
                    style={{
                        width: '100%',
                        height: cardHeight,
                    }}
                    resizeMode="cover"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: horizontalPadding,
                        paddingVertical: verticalPadding,
                    }}>
                        {/* Header - Total Pendapatan with Eye Icon */}
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 8,
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: titleFontSize,
                                marginRight: 8,
                                fontWeight: '500'
                            }}>
                                Total Pendapatan
                            </Text>
                            {secretsMoneyVisible ? (
                                <TouchableOpacity
                                    onPress={() => setSecretsMoneyVisible(false)}
                                    style={{ padding: 4 }}
                                    activeOpacity={0.7}
                                >
                                    <MoneySecrettsIcons />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => setSecretsMoneyVisible(true)}
                                    style={{ padding: 4 }}
                                    activeOpacity={0.7}
                                >
                                    <SeeMoneyIcons />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Amount Display */}
                        <Text style={{
                            fontSize: amountFontSize,
                            fontWeight: "700",
                            color: "#fff",
                            textAlign: "center",
                        }}>
                            {secretsMoneyVisible ? 'Rp ******' : 'Rp 12.500.000'}
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ marginTop: 7 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{
                        marginTop: 14,
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#000',
                    }}>
                        Order Managament
                    </Text>

                    <TouchableOpacity>
                        <Text style={{
                            marginTop: 8,
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#169953',
                        }}>
                            Lihat Semua
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    marginTop: 12,
                }}>
                    {
                        dataMenu.map(item => (
                            <View
                                key={item.id}
                                style={{
                                    width: '48%',
                                }}
                            >
                                <CardDashboard
                                    icon={item.icon}
                                    label={item.label}
                                    number={item.number}
                                />
                            </View>
                        ))
                    }
                </View>
            </View>

        </View>
    );
};

export default MenuDashboard;
