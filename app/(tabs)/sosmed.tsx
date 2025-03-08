import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const posts = [
    {
        id: "1",
        name: "Chintya Riska",
        time: "4 hour ago",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "Alat ini bagus ga guys?",
        image: require("../../assets/download.jpeg"),
        likes: "10K",
        comments: "5.5K",
        views: "10K",
        shares: "5K",
    },
    {
        id: "2",
        name: "Natasya Julio",
        time: "5 hour ago",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        text: "Ada yang tau ga alat yang baru seperti ini? Aku butuh banget guys",
        image: require("../../assets/download.jpeg"),
        likes: "1.5K",
        comments: "3.5K",
        views: "50K",
        shares: "10K",
    },
];

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
};

interface Post {
    id: string;
    name: string;
    time: string;
    profilePic: string;
    text: string;
    image: any;
    likes: string;
    comments: string;
    views: string;
    shares: string;
}

const PostItem = ({ item }: { item: Post }) => (
    <View className="bg-white p-5 my-3 mx-5 rounded-lg shadow-md">
        {/* POST HEADER */}
        <View className="flex-row items-center mb-3">
            <Image
                source={{ uri: item.profilePic }}
                className="w-12 h-12 rounded-full"
            />
            <View className="ml-3 flex-1">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-sm text-gray-500">{item.time}</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="gray" />
            </TouchableOpacity>
        </View>

        {/* POST CONTENT */}
        <Text className="text-base mb-3">{item.text}</Text>
        <Image source={item.image} className="w-full h-64 rounded-lg" />

        {/* POST FOOTER */}
        <View className="flex-row justify-between mt-3">
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="heart" size={18} color="gray" />
                <Text className="ml-2 text-gray-500">{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="comment" size={18} color="gray" />
                <Text className="ml-2 text-gray-500">{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="eye" size={18} color="gray" />
                <Text className="ml-2 text-gray-500">{item.views}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
                <FontAwesome name="share" size={18} color="gray" />
                <Text className="ml-2 text-gray-500">{item.shares}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const renderHeader = () => (
    <View className="flex-row items-center justify-between px-5 py-3 bg-white">
        <Image
            source={{
                uri: "https://randomuser.me/api/portraits/men/3.jpg",
            }}
            className="w-10 h-10 rounded-full"
        />
        <View className="flex-1 ml-3">
            <Text className="text-sm text-gray-500">{getGreeting()}</Text>
            <Text className="text-lg font-bold">Mambaus Baus</Text>
        </View>
        <View className="flex-row">
            <TouchableOpacity className="bg-green-600 p-2 rounded-lg ml-2">
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-600 p-2 rounded-lg ml-2">
                <Ionicons name="chatbubble-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </View>
);

const renderSearchBar = (router: ReturnType<typeof useRouter>) => (
    <View className="flex-row items-center px-5 my-3">
        <TextInput
            className="flex-1 bg-gray-100 p-3 rounded-lg text-sm"
            placeholder="Find what you're looking for..."
        />
        <TouchableOpacity
            className="bg-green-600 p-3 rounded-lg ml-3"
            onPress={() => router.push("/newpost")}
        >
            <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
    </View>
);

const SocialScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white pt-5">
            {renderHeader()}
            {renderSearchBar(router)}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostItem item={item} />}
            />
        </View>
    );
};

export default SocialScreen;
