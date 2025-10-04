// styles/home.styles.ts
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
	// Screen container
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 50,
		paddingBottom: 50,
		backgroundColor: "#f5f7fa",
	},

	// Header
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	headerButtons: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	resetButton: {
		padding: 10,
	},
	scannerButton: {
		padding: 10,
	},

	// Pantry grid
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		padding: 5,
		gap: 15,
	},
	foodItem: {
		width: 80,
		height: 100,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	foodIcon: {
		width: 65,
		height: 65,
		resizeMode: "contain",
		marginBottom: 5,
	},

	// Hover card
	hoverCard: {
		position: "absolute",
		top: -50,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		minWidth: 120,
		zIndex: 10,
	},
	expiryDate: {
		fontSize: 12,
		opacity: 0.7,
	},
	deleteButton: {
		position: "absolute",
		top: 5,
		right: 5,
		width: 20,
		height: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	deleteX: {
		color: "red",
		fontSize: 16,
	},
	shelvesContainer: {
		flex: 1,
		flexDirection: "column",
		gap: 20, // spacing between shelves
	},

	// Scroll container for all shelves
	shelvesScroll: {
		paddingTop: 60,
		paddingHorizontal: 10,
		paddingBottom: 40,
		gap: 20, // space between shelves
	},

	// One “shelf row”
	shelfRow: {
		position: "relative",
		height: 110, // row height (tweak if your shelf.png is taller)
		justifyContent: "center",
	},

	// The shelf background image (behind the row)
	shelfBg: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		opacity: 0.95, // slightly transparent if you want
	},

	// Items on top of the shelf
	rowItems: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		height: "100%",
		paddingHorizontal: 16,
	},
});
