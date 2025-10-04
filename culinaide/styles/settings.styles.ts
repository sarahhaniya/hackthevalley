import { StyleSheet } from "react-native";

export const COLORS = {
	primary: "#d1383c",
	dark: "#000A2E",
	white: "#ffffff",
	gray: "#666666",
};

export const settingsStyles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		marginHorizontal: 16,
		marginBottom: 20,
		shadowColor: COLORS.dark,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 16,
		color: COLORS.dark,
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
		color: COLORS.dark,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		backgroundColor: COLORS.white,
	},
	toggleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 12,
	},
	saveButtonText: {
		color: COLORS.dark,
		fontSize: 16,
		fontWeight: "600",
	},
});
