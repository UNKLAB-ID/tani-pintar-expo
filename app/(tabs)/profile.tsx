import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
    const [bannerImage, setBannerImage] = useState(
        "https://picsum.photos/seed/picsum/200/300"
    );
    const [profileImage, setProfileImage] = useState(
        "https://randomuser.me/api/portraits/men/3.jpg"
    );

    const pickImage = (
        setImage: React.Dispatch<React.SetStateAction<string>>
    ) => {
        // nanti buat ambil image di sini
        setImage("https://picsum.photos/seed/picsum/200/300");
    };
    const [posts, setPosts] = useState([
        {
            id: "1",
            username: "Mambaus Baus",
            time: "30 min ago",
            content:
                "Apakah ada yang tau untuk pertanian guys? ada yang punya saran kah?",
            likes: 50,
            comments: 100,
            shares: 20,
        },
        {
            id: "2",
            username: "Mambaus Baus",
            time: "20 min ago",
            content: "Menurut kalian ini bagus ga si guys?? mau coba hmmm...",
            image: "https://picsum.photos/seed/picsum/200/300",
            likes: 100,
            comments: 250,
            shares: 40,
        },
    ]);

    return (
        <ScrollView style={styles.container}>
            {/* 🔝 Header */}
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Mambaus Baus</Text>
                <Ionicons name="search" size={24} color="black" />
            </View>

            {/* 🖼️ Banner */}
            <TouchableOpacity onPress={() => pickImage(setBannerImage)}>
                <Image source={{ uri: bannerImage }} style={styles.banner} />
                <Ionicons
                    name="pencil"
                    size={24}
                    color="black"
                    style={styles.editIconBanner}
                />
            </TouchableOpacity>

            {/* 🏞️ Profile Section */}
            <View style={styles.profileSection}>
                <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.name}>Mambaus Baus</Text>
                <Text style={styles.stats}>150 Followers • 50 Following</Text>
                <Text style={styles.location}>
                    Surabaya - Jakarta • Petani Indonesia
                </Text>
                <Text style={styles.community}>
                    Komunitas Pertanian Surabaya
                </Text>

                <View style={styles.profileActions}>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ℹ️ About Section */}
            <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>About</Text>
                <Text style={styles.aboutText}>
                    Saya adalah petani yang sudah berkecimpung selama 11 tahun
                    dan saya senang dengan pekerjaan saya ini. Semoga pertanian
                    di Indonesia semakin maju dan berkembang, gaskeun boss!!
                </Text>
            </View>

            {/* 📝 Posts Section */}
            <View style={styles.postSection}>
                <Text style={styles.postTitle}>Post</Text>
                <TouchableOpacity style={styles.writePostButton}>
                    <Text style={styles.writePostText}>Write a post</Text>
                </TouchableOpacity>
            </View>

            {/* 📜 Daftar Postingan */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postCard}>
                        <View style={styles.postHeader}>
                            <Text style={styles.postUsername}>
                                {item.username}
                            </Text>
                            <Text style={styles.postTime}>{item.time}</Text>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={20}
                                color="black"
                            />
                        </View>
                        <Text style={styles.postContent}>{item.content}</Text>
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                style={styles.postImage}
                            />
                        )}
                        <View style={styles.postActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons
                                    name="heart-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text>{item.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={20}
                                    color="black"
                                />
                                <Text>{item.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
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

            {/* 🔽 Tombol "All Posts" */}
            <TouchableOpacity style={styles.allPostsButton}>
                <Text style={styles.allPostsText}>View All Post </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editIconBanner: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    editIconProfile: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    banner: {
        width: "100%",
        height: 120,
    },
    profileSection: {
        alignItems: "center",
        padding: 15,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: -40,
        borderWidth: 3,
        borderColor: "#fff",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    stats: {
        fontSize: 14,
        color: "#666",
    },
    location: {
        fontSize: 14,
        color: "#888",
    },
    community: {
        fontSize: 14,
        color: "#28a745",
        fontWeight: "bold",
        marginBottom: 10,
    },
    profileActions: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
    },
    editProfileButton: {
        backgroundColor: "#28a745",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    editProfileText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    moreButton: {
        padding: 8,
    },
    aboutSection: {
        padding: 15,
    },
    aboutTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    aboutText: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    postSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    writePostButton: {
        backgroundColor: "#28a745",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    writePostText: {
        color: "#fff",
        fontWeight: "bold",
    },
    postCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    postHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    postUsername: {
        fontWeight: "bold",
    },
    postTime: {
        color: "#888",
        fontSize: 12,
    },
    postContent: {
        fontSize: 14,
        marginVertical: 5,
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    postActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    allPostsButton: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    allPostsText: {
        color: "#28a745",
        fontWeight: "bold",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
    },
});
