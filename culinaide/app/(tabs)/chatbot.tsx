import React, { useState } from "react";
import {
	View,
	Text,
	Switch,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const GEMINI_API_KEY = "AIzaSyD2TcUZwqfiIybwU9cLXtYxEmxk_ETF0Ho"; // replace with your actual key

export default function Chatbot() {
	const [useGemini, setUseGemini] = useState(false);
	const [messages, setMessages] = useState([
		{ role: "assistant", text: "Hi! I'm Gemini 🤖 — ask me anything!" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSend = async () => {
		if (!input.trim()) return;
		const userMessage = { role: "user", text: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setLoading(true);

		try {
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						contents: [
							{
								role: "user",
								parts: [{ text: input }],
							},
						],
					}),
				}
			);

			const data = await response.json();

			let text =
				data?.candidates?.[0]?.content?.parts?.[0]?.text ||
				data?.promptFeedback?.blockReason ||
				"⚠️ No response.";

			if (data?.promptFeedback?.blockReason === "SAFETY") {
				text = "⚠️ Gemini blocked this response for safety reasons.";
			}

			setMessages((prev) => [...prev, { role: "assistant", text }]);
		} catch (err) {
			console.error(err);
			setMessages((prev) => [
				...prev,
				{ role: "assistant", text: "⚠️ Error connecting to Gemini." },
			]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.toggleRow}>
				<Text style={styles.toggleLabel}>Voiceflow</Text>
				<Switch
					value={useGemini}
					onValueChange={setUseGemini}
					trackColor={{ false: "#ccc", true: "#d1383c" }}
					thumbColor={useGemini ? "#fff" : "#fff"}
				/>
				<Text style={styles.toggleLabel}>Gemini</Text>
			</View>

			{useGemini ? (
				<View style={{ flex: 1 }}>
					<ScrollView
						style={styles.chat}
						contentContainerStyle={{ paddingBottom: 80 }}
					>
						{messages.map((m, i) => (
							<View
								key={i}
								style={[
									styles.message,
									m.role === "user" ? styles.userMsg : styles.botMsg,
								]}
							>
								<Text style={styles.messageText}>{m.text}</Text>
							</View>
						))}
						{loading && (
							<Text style={styles.loading}>Gemini is thinking...</Text>
						)}
					</ScrollView>

					<View style={styles.inputContainer}>
						<TextInput
							value={input}
							onChangeText={setInput}
							placeholder="Type your message..."
							style={styles.input}
						/>
						<Pressable style={styles.button} onPress={handleSend}>
							<Text style={styles.buttonText}>Send</Text>
						</Pressable>
					</View>
				</View>
			) : (
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<WebView
						originWhitelist={["*"]}
						source={require("../../assets/index.html")}
						javaScriptEnabled
						domStorageEnabled
						cacheEnabled
						setSupportMultipleWindows={false}
						overScrollMode="never"
						pullToRefreshEnabled={false}
						style={styles.webview}
					/>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	toggleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		backgroundColor: "#f7f7f7",
		borderBottomWidth: 1,
		borderColor: "#ddd",
	},
	toggleLabel: {
		fontSize: 16,
		fontWeight: "600",
		marginHorizontal: 10,
		color: "#333",
	},
	chat: { flex: 1, padding: 16 },
	message: {
		padding: 12,
		borderRadius: 10,
		marginBottom: 8,
		maxWidth: "85%",
	},
	userMsg: {
		backgroundColor: "#d1383c",
		alignSelf: "flex-end",
	},
	botMsg: {
		backgroundColor: "#f1f1f1",
		alignSelf: "flex-start",
	},
	messageText: { color: "#000" },
	inputContainer: {
		flexDirection: "row",
		padding: 10,
		borderTopWidth: 1,
		borderColor: "#ddd",
		backgroundColor: "#fafafa",
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginRight: 8,
	},
	button: {
		backgroundColor: "#d1383c",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	buttonText: { color: "#fff", fontWeight: "600" },
	loading: { color: "#666", fontStyle: "italic", marginBottom: 10 },
	webview: { flex: 1 },
});
