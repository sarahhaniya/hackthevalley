import { StyleSheet } from "react-native";

export const COLORS = {
	primary: "#d1383c",
	black: "#1a1a1a",
	white: "#ffffff",
	gray: "#666666",
};

export const profileStyles = StyleSheet.create({
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginHorizontal: 16,
		marginBottom: 40,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		gap: 16,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		color: COLORS.black,
		fontSize: 20,
		fontWeight: "600",
	},
	profileEmail: {
		color: COLORS.gray,
		fontSize: 14,
	},
});
