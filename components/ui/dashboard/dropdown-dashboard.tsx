import { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DropdownDashboardProps {
    options?: string[];
    defaultValue?: string;
    onSelect?: (value: string) => void;
}

const DropdownDashboard: React.FC<DropdownDashboardProps> = ({
    options = ['Day', 'Month'],
    defaultValue = 'Day',
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue);

    const handleSelect = (value: string) => {
        setSelected(value);
        setIsOpen(false);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <View style={{ position: 'relative' }}>
            {/* Dropdown Button */}
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: '#DDDDDD',
                    borderRadius: 6,
                    backgroundColor: '#fff',
                    gap: 6,
                }}
            >
                <Ionicons name="calendar-outline" size={16} color="#1F1F1F" />
                <Text style={{
                    fontSize: 14,
                    color: '#1F1F1F',
                    fontWeight: '500',
                }}>
                    {selected}
                </Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#1F1F1F"
                />
            </TouchableOpacity>

            {/* Dropdown Options */}
            {isOpen && (
                <View style={{
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#DDDDDD',
                    borderRadius: 6,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 5,
                    zIndex: 1000,
                    maxHeight: 200,
                    overflow: 'hidden',
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                    >
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelect(option)}
                                style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    borderBottomWidth: index < options.length - 1 ? 1 : 0,
                                    borderBottomColor: '#F0F0F0',
                                }}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: selected === option ? '#169953' : '#1F1F1F',
                                    fontWeight: selected === option ? '600' : '400',
                                }}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Backdrop untuk close dropdown saat klik di luar */}
            {isOpen && (
                <Pressable
                    onPress={() => setIsOpen(false)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                    }}
                />
            )}
        </View>
    );
};

export default DropdownDashboard;
