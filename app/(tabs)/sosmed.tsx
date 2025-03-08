import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
} from "react-native";
import {
    Ionicons,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
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
        isVerified: true,
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
        isVerified: false,
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
    isVerified?: boolean;
}

const PostItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
        {/* POST HEADER */}
        <View style={styles.postHeader}>
            <View style={styles.postHeaderLeft}>
                <Image
                    source={{ uri: item.profilePic }}
                    style={styles.profilePic}
                />
                <View style={styles.postHeaderText}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.postName}>{item.name}</Text>
                        {item.isVerified && (
                            <MaterialCommunityIcons
                                name="check-decagram"
                                size={16}
                                color="#38a169"
                                style={styles.verifiedBadge}
                            />
                        )}
                    </View>
                    <Text style={styles.postTime}>{item.time}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
        </View>

        {/* POST CONTENT */}
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.postImage} />
        </View>

        {/* POST FOOTER */}
        <View style={styles.postStats}>
            <View style={styles.statItem}>
                <FontAwesome5 name="heart" size={14} color="#ff6b6b" solid />
                <Text style={styles.statNumber}>{item.likes}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <FontAwesome5 name="comment" size={14} color="#74b9ff" />
                <Text style={styles.statNumber}>{item.comments}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <FontAwesome5 name="eye" size={14} color="#a29bfe" />
                <Text style={styles.statNumber}>{item.views}</Text>
            </View>
        </View>

        <View style={styles.actionDivider} />

        {/* INTERACTION BUTTONS */}
        <View style={styles.postFooter}>
            <TouchableOpacity style={styles.postFooterButton}>
                <FontAwesome5 name="heart" size={18} color="#666" />
                <Text style={styles.postFooterText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postFooterButton}>
                <FontAwesome5 name="comment" size={18} color="#666" />
                <Text style={styles.postFooterText}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postFooterButton}>
                <FontAwesome5 name="share" size={18} color="#666" />
                <Text style={styles.postFooterText}>Share</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const renderHeader = () => (
    <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
            <Image
                source={{
                    uri: "https://randomuser.me/api/portraits/men/3.jpg",
                }}
                style={styles.headerProfilePic}
            />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerGreeting}>{getGreeting()}</Text>
                <Text style={styles.headerName}>Mambaus Baus</Text>
            </View>
        </View>
        <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.badgeContainer}>
                    <View style={styles.badge} />
                </View>
                <Ionicons
                    name="notifications-outline"
                    size={22}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={22} color="white" />
            </TouchableOpacity>
        </View>
    </View>
);

const renderSearchBar = (router: ReturnType<typeof useRouter>) => (
    <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
            <Ionicons
                name="search-outline"
                size={20}
                color="#999"
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchBarInput}
                placeholder="Find what you're looking for..."
                placeholderTextColor="#999"
            />
        </View>
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/newpost")}
        >
            <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
    </View>
);

const SocialScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {renderHeader()}
            {renderSearchBar(router)}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostItem item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    listContainer: {
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerProfilePic: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderWidth: 2,
        borderColor: "#38a169",
    },
    headerTextContainer: {
        marginLeft: 12,
    },
    headerGreeting: {
        fontSize: 13,
        color: "#999",
        fontWeight: "500",
    },
    headerName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    headerIcons: {
        flexDirection: "row",
    },
    notificationButton: {
        backgroundColor: "#38a169",
        padding: 10,
        borderRadius: 12,
        marginLeft: 10,
        position: "relative",
    },
    messageButton: {
        backgroundColor: "#38a169",
        padding: 10,
        borderRadius: 12,
        marginLeft: 10,
    },
    badgeContainer: {
        position: "absolute",
        top: 7,
        right: 7,
        zIndex: 1,
    },
    badge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ff6b6b",
        borderWidth: 1.5,
        borderColor: "#38a169",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "white",
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBarInput: {
        flex: 1,
        fontSize: 15,
        padding: 10,
        color: "#333",
    },
    addButton: {
        backgroundColor: "#38a169",
        width: 44,
        height: 44,
        borderRadius: 12,
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#38a169",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    postContainer: {
        backgroundColor: "white",
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    postHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    postHeaderText: {
        marginLeft: 12,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    verifiedBadge: {
        marginLeft: 4,
    },
    postName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    postTime: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
    moreButton: {
        padding: 5,
    },
    postText: {
        fontSize: 15,
        color: "#444",
        lineHeight: 20,
        marginBottom: 12,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
    },
    postStats: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8,
    },
    statNumber: {
        fontSize: 13,
        color: "#777",
        marginLeft: 4,
    },
    statDivider: {
        width: 1,
        height: 14,
        backgroundColor: "#ddd",
        marginHorizontal: 8,
    },
    actionDivider: {
        height: 1,
        backgroundColor: "#f0f0f0",
        marginVertical: 10,
    },
    postFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 6,
    },
    postFooterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    postFooterText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
    },
});

export default SocialScreen;
