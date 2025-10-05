import React, { useState, useRef, useEffect } from "react";
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
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const GEMINI_API_KEY = "AIzaSyD2TcUZwqfiIybwU9cLXtYxEmxk_ETF0Ho";

export default function Chatbot() {
	const [useGemini, setUseGemini] = useState(false);
	const [messages, setMessages] = useState([
		{ role: "assistant", text: "Hi! I'm Gemini ✧˖ — ask me anything!" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const scrollViewRef = useRef<ScrollView>(null);

	// get device safe area insets
	const insets = useSafeAreaInsets();

	useEffect(() => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	}, [messages]);

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
		<View style={[styles.outerContainer, { paddingTop: insets.top }]}>
			<View style={styles.toggleRow}>
				<Text style={styles.toggleLabel}>Voiceflow</Text>
				<Switch
					value={useGemini}
					onValueChange={setUseGemini}
					trackColor={{ false: "#ccc", true: "#d1383c" }}
					thumbColor={"#fff"}
				/>
				<Text style={styles.toggleLabel}>Gemini</Text>
			</View>

			{useGemini ? (
				<View style={styles.chatContainer}>
					<ScrollView
						ref={scrollViewRef}
						onContentSizeChange={() =>
							scrollViewRef.current?.scrollToEnd({ animated: true })
						}
						style={styles.chat}
						contentContainerStyle={styles.chatContent}
						showsVerticalScrollIndicator={false}
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

					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : undefined}
						keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
					>
						<View
							style={[
								styles.inputContainer,
								{ paddingBottom: insets.bottom ? 0 : 0 }, // removes bottom white gap
							]}
						>
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
					</KeyboardAvoidingView>
				</View>
			) : (
				<KeyboardAvoidingView
					style={styles.webContainer}
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
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	toggleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
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
	chatContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	chat: {
		flex: 1,
		paddingHorizontal: 16,
	},
	chatContent: {
		paddingBottom: 12,
	},
	message: {
		padding: 12,
		borderRadius: 10,
		marginBottom: 8,
		marginTop: 8,
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
	messageText: {
		color: "#000",
	},
	inputContainer: {
		flexDirection: "row",
		padding: 10,
		borderTopWidth: 1,
		paddingBottom: 10,
		marginBottom: 10,
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
	buttonText: {
		color: "#fff",
		fontWeight: "600",
	},
	loading: {
		color: "#666",
		fontStyle: "italic",
		marginBottom: 10,
	},
	webContainer: {
		flex: 1,
	},
	webview: {
		flex: 1,
	},
});
