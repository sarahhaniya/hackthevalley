import { StyleSheet } from "react-native";

const COLORS = {
	primary: "#a2bcf7",
	secondary: "#f1f55a",
	accent: "#e02d00",
	black: "#1a1a1a",
	white: "#ffffff",
	lightGray: "#f5f7fa",
	primaryLight: "#a2bcf720",
	primaryDark: "#7494d1",
	secondaryDark: "#000A2E",
};

export const accountStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginTop: 60,
		backgroundColor: COLORS.lightGray,
	},
	section: {
		marginBottom: 24,
		gap: 12,
		backgroundColor: COLORS.lightGray,
	},
	sectionTitle: {
		color: COLORS.black,
		backgroundColor: COLORS.lightGray,
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 8,
	},
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
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
		color: COLORS.black + "99",
		fontSize: 14,
	},
	ingredientCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		gap: 12,
		borderLeftWidth: 4,
		borderLeftColor: COLORS.primary,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	ingredientInfo: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	ingredientName: {
		color: COLORS.black,
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	ingredientDetails: {
		color: COLORS.black + "99",
		fontSize: 14,
	},
	settingCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	settingContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	settingTitle: {
		color: COLORS.black,
		fontSize: 16,
		fontWeight: "500",
	},
});

export { COLORS };
