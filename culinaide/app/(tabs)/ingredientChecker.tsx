// import { ThemedView } from "@/components/themed-view";
// import { ThemedText } from "@/components/themed-text";
// import { MaterialIcons } from "@expo/vector-icons"; // app/(tabs)/account.tsx
// import { StyleSheet, ScrollView, Pressable, Switch } from "react-native";
// import { useState } from "react";
// import { router } from "expo-router";

// const COLORS = {
// 	primary: "#d1383c",
// 	black: "#1a1a1a",
// 	white: "#ffffff",
// 	gray: "#666",
// 	lightGray: "#f5f7fa",
// };

// export default function IngredientChecker() {
// 	const [expiryNotifications, setExpiryNotifications] = useState(true);
// 	const [dailyRecipes, setDailyRecipes] = useState(true);

// 	return (
// 		<ScrollView style={styles.container}>
// 			{/* Profile Section */}
// 			<ThemedView style={styles.section}>
// 				<ThemedText style={styles.sectionTitle}>Profile</ThemedText>
// 				<Pressable onPress={() => router.push("/(account)/account-edit")}>
// 					<ThemedView style={styles.profileCard}>
// 						<MaterialIcons
// 							name="person"
// 							size={60}
// 							color={COLORS.primary}
// 						/>
// 						<ThemedView style={styles.profileInfo}>
// 							<ThemedText style={styles.profileName}>
// 								John Doe
// 							</ThemedText>
// 							<ThemedText style={styles.profileEmail}>
// 								john.doe@example.com
// 							</ThemedText>
// 						</ThemedView>
// 					</ThemedView>
// 				</Pressable>
// 			</ThemedView>

// 			{/* Settings Section */}
// 			<ThemedView style={styles.section}>
// 				<ThemedText style={styles.sectionTitle}>Settings</ThemedText>

// 				{/* Expiry Notifications */}
// 				<ThemedView style={styles.settingCard}>
// 					<ThemedText style={styles.settingText}>
// 						Expiry Notifications
// 					</ThemedText>
// 					<Switch
// 						value={expiryNotifications}
// 						onValueChange={setExpiryNotifications}
// 						trackColor={{ false: "#767577", true: COLORS.primary }}
// 						thumbColor={COLORS.white}
// 					/>
// 				</ThemedView>

// 				{/* Daily Recipe Suggestions */}
// 				<ThemedView style={styles.settingCard}>
// 					<ThemedText style={styles.settingText}>
// 						Daily Recipe Suggestions
// 					</ThemedText>
// 					<Switch
// 						value={dailyRecipes}
// 						onValueChange={setDailyRecipes}
// 						trackColor={{ false: "#767577", true: COLORS.primary }}
// 						thumbColor={COLORS.white}
// 					/>
// 				</ThemedView>

// 				{/* Food Preferences */}
// 				<Pressable
// 					style={styles.settingCard}
// 					onPress={() => router.push("/(account)/settings")}
// 				>
// 					<ThemedText style={styles.settingText}>
// 						Food Preferences
// 					</ThemedText>
// 					<MaterialIcons
// 						name="chevron-right"
// 						size={20}
// 						color={COLORS.black}
// 					/>
// 				</Pressable>
// 			</ThemedView>
// 		</ScrollView>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 16,
// 		marginTop: 60,
// 		backgroundColor: COLORS.lightGray,
// 	},
// 	section: {
// 		marginBottom: 24,
// 	},
// 	sectionTitle: {
// 		color: COLORS.black,
// 		fontSize: 22,
// 		fontWeight: "600",
// 		marginBottom: 12,
// 	},
// 	profileCard: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		padding: 16,
// 		backgroundColor: COLORS.white,
// 		borderRadius: 12,
// 		gap: 16,
// 		shadowColor: COLORS.black,
// 		shadowOpacity: 0.1,
// 		shadowRadius: 4,
// 		shadowOffset: { width: 0, height: 2 },
// 	},
// 	profileInfo: {
// 		flex: 1,
// 	},
// 	profileName: {
// 		fontSize: 18,
// 		fontWeight: "600",
// 		color: COLORS.black,
// 	},
// 	profileEmail: {
// 		fontSize: 14,
// 		color: COLORS.gray,
// 	},
// 	settingCard: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		padding: 16,
// 		backgroundColor: COLORS.white,
// 		borderRadius: 12,
// 		marginBottom: 12,
// 		shadowColor: COLORS.black,
// 		shadowOpacity: 0.1,
// 		shadowRadius: 4,
// 		shadowOffset: { width: 0, height: 2 },
// 	},
// 	settingText: {
// 		fontSize: 16,
// 		fontWeight: "500",
// 		color: COLORS.black,
// 	},
// });
