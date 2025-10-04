import React from "react";
import { StyleSheet, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const Chatbot: React.FC = () => {
	const insets = useSafeAreaInsets();

	return (
		<SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
			<View style={styles.webviewContainer}>
				<WebView
					originWhitelist={["*"]}
					source={require("../../assets/index.html")}
					javaScriptEnabled
					style={styles.webview}
				/>
			</View>
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
