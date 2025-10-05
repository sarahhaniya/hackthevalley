import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Post = {
	id: string;
	username: string;
	item: string;
	expiryDate: string;
};

const mockPosts: Post[] = [
	{
		id: "1",
		username: "cakeboss",
		item: "Blueberry Muffins",
		expiryDate: "2025-10-07",
	},
	{
		id: "2",
		username: "foodie_ella",
		item: "Leftover Pasta",
		expiryDate: "2025-10-06",
	},
	{
		id: "3",
		username: "campuschef",
		item: "Bananas (4 ripe)",
		expiryDate: "2025-10-05",
	},
];

export default function CommunityScreen() {
	const [friends, setFriends] = useState<string[]>([]);

	const handleAddFriend = () => {
		Alert.alert("Friend Added", "You’ve added a new friend successfully!");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Community Share</Text>

				<View style={styles.headerButtons}>
					<Pressable onPress={handleAddFriend} style={styles.iconButton}>
						<MaterialIcons name="person-add" size={26} color="#d1383c" />
					</Pressable>

					<Pressable
						onPress={() =>
							Alert.alert("Share Item", "You’re about to share an item!")
						}
						style={[styles.iconButton, styles.shareButton]}
					>
						<MaterialIcons
							name="add-circle-outline"
							size={26}
							color="#d1383c"
						/>
					</Pressable>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.feed}>
				{mockPosts.map((post) => (
					<View key={post.id} style={styles.card}>
						<Text style={styles.username}>@{post.username}</Text>
						<Text style={styles.itemText}>
							is giving away{" "}
							<Text style={styles.highlight}>{post.item}</Text>
						</Text>
						<Text style={styles.expiry}>
							Expires:{" "}
							<Text style={styles.expiryDate}>{post.expiryDate}</Text>
						</Text>
						<Pressable
							style={styles.claimButton}
							onPress={() =>
								Alert.alert(
									"Request Sent",
									`You’ve requested ${post.item} from ${post.username}.`
								)
							}
						>
							<Text style={styles.claimText}>Request</Text>
						</Pressable>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: "#333",
	},
	feed: {
		padding: 16,
	},
	card: {
		backgroundColor: "#fafafa",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#eee",
	},
	username: {
		fontWeight: "600",
		color: "#d1383c",
		marginBottom: 6,
	},
	itemText: {
		fontSize: 16,
		color: "#333",
		marginBottom: 4,
	},
	highlight: {
		fontWeight: "700",
	},
	expiry: {
		color: "#666",
		fontSize: 13,
		marginBottom: 8,
	},
	expiryDate: {
		fontWeight: "600",
		color: "#d1383c",
	},
	claimButton: {
		backgroundColor: "#d1383c",
		borderRadius: 8,
		paddingVertical: 8,
		alignItems: "center",
	},
	claimText: {
		color: "#fff",
		fontWeight: "600",
	},
	headerButtons: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	iconButton: {
		padding: 4,
	},
	shareButton: {
		marginLeft: 4,
	},
});
