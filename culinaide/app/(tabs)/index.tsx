import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
	return (
		<ThemedView style={{ justifyContent: "center", alignItems: "center" }}>
			<ThemedText type="title">Welcome to Culinaide 👋</ThemedText>
			<ThemedText>Your personal cooking companion</ThemedText>
			<ThemedText type="link">Explore recipes →</ThemedText>
		</ThemedView>
	);
}
