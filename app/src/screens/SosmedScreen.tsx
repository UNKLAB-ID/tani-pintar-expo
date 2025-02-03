import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const posts = [
    {
        id: "1",
        name: "Chintya Riska",
        time: "4 hour ago",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "Alat ini bagus ga guys?",
        image: require("../../../assets/download.jpeg"),
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
        image: require("../../../assets/download.jpeg"),
        likes: "1.5K",
        comments: "3.5K",
        views: "50K",
        shares: "10K",
    },
];

const SocialScreen = () => {
    return (
        <View style={styles.container}>
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

                        {/* Post Content */}
                        <Text style={styles.postText}>{item.text}</Text>
                        <Image source={item.image} style={styles.postImage} />

                        {/* Footer - Like, Comment, View, Share */}
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
        top: 20,
    },
    postContainer: {
        backgroundColor: "#fff",
        padding: 20, // Increased padding
        marginVertical: 12, // Increased margin
        marginHorizontal: 20, // Increased margin
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15, // Increased margin
    },
    profilePic: {
        width: 50, // Increased size
        height: 50, // Increased size
        borderRadius: 25, // Adjusted for new size
    },
    headerText: {
        marginLeft: 15, // Increased margin
        flex: 1,
    },
    username: {
        fontSize: 18, // Increased font size
        fontWeight: "bold",
    },
    time: {
        fontSize: 14, // Increased font size
        color: "gray",
    },
    postText: {
        fontSize: 16, // Increased font size
        marginBottom: 15, // Increased margin
    },
    postImage: {
        width: "100%",
        height: 250, // Increased height
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15, // Increased margin
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconText: {
        marginLeft: 5,
        fontSize: 16, // Increased font size
        color: "gray",
    },
});

export default SocialScreen;
