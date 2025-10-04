import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function ChatbotScreen() {
	return (
		<ThemedView style={{ justifyContent: "center", alignItems: "center" }}>
			<ThemedText type="title">Culinaide Chatbot 🤖</ThemedText>
			<ThemedText>Ask me for recipes, nutrition info, or tips!</ThemedText>
			<ThemedText type="link">Start chatting →</ThemedText>
		</ThemedView>
	);
}
