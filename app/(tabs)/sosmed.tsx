import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
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

const SocialScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://randomuser.me/api/portraits/men/3.jpg",
                    }}
                    style={styles.profilePicSmall}
                />
                <View style={styles.headerText}>
                    <Text style={styles.greeting}>{getGreeting()}</Text>
                    <Text style={styles.name}>Mambaus Baus</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons
                            name="chatbubble-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Find what you're looking for..."
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push("/newpost")}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        {/* Header */}
                        <View style={styles.postHeader}>
                            <Image
                                source={{ uri: item.profilePic }}
                                style={styles.profilePic}
                            />
                            <View style={styles.headerText}>
                                <Text style={styles.username}>{item.name}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons
                                    name="ellipsis-vertical"
                                    size={20}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.postText}>{item.text}</Text>
                        <Image source={item.image} style={styles.postImage} />

                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.iconContainer}>
                                <FontAwesome
                                    name="heart"
                                    size={18}
                                    color="gray"
                                />
                                <Text style={styles.iconText}>
                                    {item.likes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}>
                                <FontAwesome
                                    name="comment"
                                    size={18}
                                    color="gray"
                                />
                                <Text style={styles.iconText}>
                                    {item.comments}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}>
                                <FontAwesome
                                    name="eye"
                                    size={18}
                                    color="gray"
                                />
                                <Text style={styles.iconText}>
                                    {item.views}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}>
                                <FontAwesome
                                    name="share"
                                    size={18}
                                    color="gray"
                                />
                                <Text style={styles.iconText}>
                                    {item.shares}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },

    /** HEADER **/
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    profilePicSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerText: {
        flex: 1,
        marginLeft: 10,
    },
    greeting: {
        fontSize: 14,
        color: "gray",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
    },
    iconButton: {
        backgroundColor: "#28a745",
        borderRadius: 10,
        padding: 8,
        marginLeft: 8,
    },

    /** SEARCH BAR **/
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        fontSize: 14,
    },
    addButton: {
        backgroundColor: "#28a745",
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
    },

    /** POST STYLES **/
    postContainer: {
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 12,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
    },
    time: {
        fontSize: 14,
        color: "gray",
    },
    postText: {
        fontSize: 16,
        marginBottom: 15,
    },
    postImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconText: {
        marginLeft: 5,
        fontSize: 16,
        color: "gray",
    },
});

export default SocialScreen;
