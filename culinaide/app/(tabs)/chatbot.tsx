import React from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const Chatbot: React.FC = () => {
	const insets = useSafeAreaInsets();

	return (
		<SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<View style={styles.webviewContainer}>
					<WebView
						originWhitelist={["*"]}
						source={require("../../assets/index.html")} // static Voiceflow embed
						javaScriptEnabled
						domStorageEnabled // keep chat session in storage
						cacheEnabled // don’t wipe state on rerenders
						setSupportMultipleWindows={false} // avoid "new window" reloads
						overScrollMode="never" // Android: prevent accidental reloads
						pullToRefreshEnabled={false} // Android: disable swipe-to-refresh
						style={styles.webview}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	webviewContainer: {
		flex: 1,
	},
	webview: {
		flex: 1,
	},
});

export default Chatbot;
