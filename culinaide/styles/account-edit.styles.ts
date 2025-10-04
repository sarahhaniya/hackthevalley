// styles/account-edit.styles.ts
import { StyleSheet } from "react-native";

export const accountEditStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: 24,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#f5f5f5",
		justifyContent: "center",
		alignItems: "center",
	},
	changePhotoText: {
		color: "#a2bcf7",
		marginTop: 8,
		fontSize: 16,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: "#666",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 16,
	},
	saveButton: {
		backgroundColor: "#a2bcf7",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 40,
	},
	saveButtonText: {
		color: "#000A2E",
		fontSize: 16,
		fontWeight: "600",
	},
	error: {
		color: "#e02d00",
		marginBottom: 10,
		textAlign: "center",
	},
});
