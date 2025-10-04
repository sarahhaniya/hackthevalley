import { StyleSheet, Pressable, View, Text } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { profileStyles as styles, COLORS } from "@/styles/profile.styles";

export default function ProfileCard() {
	return (
		<Pressable onPress={() => router.push("/(account)/account-edit")}>
			<View style={styles.profileCard}>
				<MaterialIcons name="person" size={60} color={COLORS.primary} />
				<View style={styles.profileInfo}>
					<Text style={styles.profileName}>John Doe</Text>
					<Text style={styles.profileEmail}>john.doe@example.com</Text>
				</View>
				<MaterialIcons name="chevron-right" size={28} color={COLORS.gray} />
			</View>
		</Pressable>
	);
}

