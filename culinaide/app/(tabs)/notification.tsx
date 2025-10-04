import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function NotificationScreen() {
	return (
		<ThemedView style={{ justifyContent: "center", alignItems: "center" }}>
			<ThemedText type="title">Notifications 🔔</ThemedText>
			<ThemedText>Stay updated about expiring ingredients</ThemedText>
			<ThemedText type="link">View alerts →</ThemedText>
		</ThemedView>
	);
}
