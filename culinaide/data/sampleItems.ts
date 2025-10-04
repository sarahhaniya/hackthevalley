// culinaide/data/sampleItems.ts

export interface FoodItem {
	id: string;
	name: string;
	expiryDate: string;
	image: any; 
	scanned: boolean;
}

// Items WITHOUT shelf numbers → shelves are assigned dynamically
export const sampleItems: FoodItem[] = [
	{
		id: "1",
		name: "Strawberries",
		expiryDate: "2025-10-12",
		image: require("@/assets/images/food1.png"),
		scanned: false,
	},
	{
		id: "2",
		name: "Eggs",
		expiryDate: "2025-10-14",
		image: require("@/assets/images/food2.png"),
		scanned: false,
	},
	{
		id: "3",
		name: "Cream Cheese",
		expiryDate: "2025-11-14",
		image: require("@/assets/images/food3.png"),
		scanned: false,
	},
	{
		id: "4",
		name: "Frozen Soy Beans",
		expiryDate: "2025-11-26",
		image: require("@/assets/images/food4.png"),
		scanned: true,
	},
	{
		id: "5",
		name: "Bagels",
		expiryDate: "2025-10-30",
		image: require("@/assets/images/food5.png"),
		scanned: false,
	},
	{
		id: "6",
		name: "Plant-based Cheese",
		expiryDate: "2025-11-20",
		image: require("@/assets/images/food6.png"),
		scanned: false,
	},
	{
		id: "7",
		name: "Chicken",
		expiryDate: "2025-10-06",
		image: require("@/assets/images/food7.png"),
		scanned: false,
	},
	{
		id: "8",
		name: "Bananas",
		expiryDate: "2025-10-11",
		image: require("@/assets/images/food8.png"),
		scanned: false,
	},
	{
		id: "9",
		name: "Tomatoes",
		expiryDate: "2025-10-13",
		image: require("@/assets/images/food9.png"),
		scanned: true,
	},
	{
		id: "10",
		name: "Milk",
		expiryDate: "2025-10-05",
		image: require("@/assets/images/food10.png"),
		scanned: false,
	},
	{
		id: "11",
		name: "Spinach",
		expiryDate: "2025-10-05",
		image: require("@/assets/images/food11.png"),
		scanned: false,
	},
	{
		id: "12",
		name: "Carrots",
		expiryDate: "2025-10-20",
		image: require("@/assets/images/food12.png"),
		scanned: true,
	},
	{
		id: "13",
		name: "Tofu",
		expiryDate: "2025-11-01",
		image: require("@/assets/images/food13.png"),
		scanned: true,
	},
	{
		id: "14",
		name: "Oreo",
		expiryDate: "2026-01-15",
		image: require("@/assets/images/food14.png"),
		scanned: true,
	},
	{
		id: "15",
		name: "Apples",
		expiryDate: "2025-10-25",
		image: require("@/assets/images/food15.png"),
		scanned: true,
	},
	{
		id: "16",
		name: "Rice",
		expiryDate: "2026-12-31",
		image: require("@/assets/images/food16.png"),
		scanned: true,
	},
];
