// culinaide/styles/scanner.styles.ts
import { StyleSheet } from "react-native";

export const scannerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	// Header
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingTop: 40,
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	circleButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(0,0,0,0.1)",
		alignItems: "center",
		justifyContent: "center",
	},
	closeText: {
		fontSize: 20,
	},

	// Content
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},

	// Upload
	uploadButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		padding: 20,
		borderRadius: 10,
	},
	uploadText: {
		fontSize: 16,
		marginLeft: 8,
	},

	// Loading
	loading: {
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
	},

	// Error
	error: {
		alignItems: "center",
	},
	errorText: {
		color: "red",
		marginBottom: 20,
	},
	retryButton: {
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 8,
	},

	// Results
	results: {
		width: "100%",
		alignItems: "center",
	},
	resultsTitle: {
		marginBottom: 20,
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	itemName: {
		fontSize: 16,
		fontWeight: "500",
	},
	expiryDate: {
		fontSize: 14,
		color: "#666",
	},
	scanButton: {
		marginTop: 20,
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 8,
	},
});
