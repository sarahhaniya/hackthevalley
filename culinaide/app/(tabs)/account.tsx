import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function AccountScreen() {
	return (
		<ThemedView style={{ justifyContent: "center", alignItems: "center" }}>
			<ThemedText type="title">Profile</ThemedText>
			<ThemedText>Manage your preferences and settings</ThemedText>
			<ThemedText type="link">Edit profile →</ThemedText>
		</ThemedView>
	);
}
