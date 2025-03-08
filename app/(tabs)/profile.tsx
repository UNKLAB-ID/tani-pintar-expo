import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
    const router = useRouter();
    const [bannerImage, setBannerImage] = useState(
        "https://picsum.photos/800/300"
    );
    const [profileImage, setProfileImage] = useState(
        "https://randomuser.me/api/portraits/men/3.jpg"
    );

    const pickImage = (setImage: (image: string) => void) => {
        setImage("https://picsum.photos/800/300");
    };

    const [posts, setPosts] = useState([
        {
            id: "1",
            username: "Mambaus Baus",
            time: "30 min ago",
            content: "Ada yang punya saran untuk pertanian, guys?",
            likes: 50,
            comments: 100,
            shares: 20,
        },
        {
            id: "2",
            username: "Mambaus Baus",
            time: "20 min ago",
            content: "Menurut kalian ini bagus ga si guys?? mau coba hmmm...",
            image: "https://picsum.photos/800/400",
            likes: 100,
            comments: 250,
            shares: 40,
        },
    ]);

    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white shadow-md">
                <TouchableOpacity onPress={() => router.push("/sosmed")}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold">Mambaus Baus</Text>
                <Ionicons name="search" size={24} color="black" />
            </View>

            {/* Banner */}
            <TouchableOpacity onPress={() => pickImage(setBannerImage)}>
                <Image source={{ uri: bannerImage }} className="w-full h-36" />
                <Ionicons
                    name="pencil"
                    size={24}
                    color="white"
                    className="absolute top-3 right-3"
                />
            </TouchableOpacity>

            {/* Profile Section */}
            <View className="items-center -mt-12">
                <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
                    <Image
                        source={{ uri: profileImage }}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                </TouchableOpacity>
                <Text className="text-xl font-semibold mt-2">Mambaus Baus</Text>
                <Text className="text-gray-600">
                    150 Followers • 50 Following
                </Text>
                <Text className="text-gray-500 text-sm">
                    Surabaya - Jakarta • Petani Indonesia
                </Text>
                <Text className="text-green-600 font-bold text-sm">
                    Komunitas Pertanian Surabaya
                </Text>

                {/* Buttons */}
                <View className="flex-row space-x-3 mt-3">
                    <TouchableOpacity className="bg-green-500 px-5 py-2 rounded-lg">
                        <Text className="text-white font-semibold">
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-lg">
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* About Section */}
            <View className="px-4 py-3 bg-white mt-3 rounded-lg shadow-md">
                <Text className="text-lg font-semibold">About</Text>
                <Text className="text-gray-600 mt-1">
                    Saya adalah petani yang sudah berkecimpung selama 11 tahun
                    dan saya senang dengan pekerjaan ini. Semoga pertanian di
                    Indonesia semakin maju dan berkembang! 🚜
                </Text>
            </View>

            {/* Post Section */}
            <View className="flex-row justify-between px-4 mt-5">
                <Text className="text-lg font-semibold">Posts</Text>
                <TouchableOpacity
                    onPress={() => router.push("/newpost")}
                    className="bg-green-500 px-4 py-2 rounded-lg"
                >
                    <Text className="text-white font-semibold">
                        Write a post
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Posts List */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-white mt-3 rounded-lg shadow-md p-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="font-semibold">
                                {item.username}
                            </Text>
                            <Text className="text-gray-500 text-xs">
                                {item.time}
                            </Text>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={20}
                                color="black"
                            />
                        </View>
                        <Text className="text-gray-700 mt-2">
                            {item.content}
                        </Text>
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-48 mt-2 rounded-lg"
                            />
                        )}

                        {/* Actions */}
                        <View className="flex-row justify-between mt-3">
                            <TouchableOpacity className="flex-row items-center space-x-1">
                                <Ionicons
                                    name="heart-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text>{item.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center space-x-1">
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text>{item.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center space-x-1">
                                <Ionicons
                                    name="share-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text>{item.shares}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                scrollEnabled={false}
            />

            {/* View All Posts */}
            <TouchableOpacity className="bg-white py-3 mt-3 mx-4 rounded-lg shadow-md items-center">
                <Text className="text-green-600 font-semibold">
                    View All Posts
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProfileScreen;
