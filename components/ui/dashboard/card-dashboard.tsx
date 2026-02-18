import React from "react";
import { Text, View } from "react-native";

interface CardDashboardProps {
    icon: React.ReactNode;
    label: string;
    number: number;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ icon, label, number }) => {
    return (
        <View style={{
            backgroundColor: '#F4F4F4',
            padding: 16,
            borderRadius: 12,
        }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#fff',
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {icon}
                </View>
                <Text
                    style={{
                        fontSize: 14,
                    }}
                >
                    {label}
                </Text>
            </View>
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: '600',
                    textAlign: 'right',
                }}
            >
                {number}
            </Text>
        </View>
    );
};

export default CardDashboard;