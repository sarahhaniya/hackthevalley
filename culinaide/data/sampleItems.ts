// culinaide/data/sampleItems.ts

export interface FoodItem {
	id: string;
	name: string;
	expiryDate: string;
	image: any; // reference to local image
}

// Items WITHOUT shelf numbers → shelves are assigned dynamically
export const sampleItems: FoodItem[] = [
	{
		id: "1",
		name: "Strawberries",
		expiryDate: "2025-10-12",
		image: require("@/assets/images/food1.png"),
	},
	{
		id: "2",
		name: "Eggs",
		expiryDate: "2025-10-14",
		image: require("@/assets/images/food2.png"),
	},
	{
		id: "3",
		name: "Cream Cheese",
		expiryDate: "2025-11-14",
		image: require("@/assets/images/food3.png"),
	},
	{
		id: "4",
		name: "Frozen Soy Beans",
		expiryDate: "2025-11-26",
		image: require("@/assets/images/food4.png"),
	},
	{
		id: "5",
		name: "Bagels",
		expiryDate: "2025-10-30",
		image: require("@/assets/images/food5.png"),
	},
	{
		id: "6",
		name: "Plant-based Cheese",
		expiryDate: "2025-11-20",
		image: require("@/assets/images/food6.png"),
	},
	{
		id: "7",
		name: "Chicken",
		expiryDate: "2025-10-06",
		image: require("@/assets/images/food7.png"),
	},
	{
		id: "8",
		name: "Bananas",
		expiryDate: "2025-10-11",
		image: require("@/assets/images/food8.png"),
	},
	{
		id: "9",
		name: "Tomatoes",
		expiryDate: "2025-10-13",
		image: require("@/assets/images/food9.png"),
	},
	{
		id: "10",
		name: "Milk",
		expiryDate: "2025-10-05",
		image: require("@/assets/images/food10.png"),
	},
	{
		id: "11",
		name: "Spinach",
		expiryDate: "2025-10-05",
		image: require("@/assets/images/food11.png"),
	},
	{
		id: "12",
		name: "Carrots",
		expiryDate: "2025-10-20",
		image: require("@/assets/images/food12.png"),
	},
	{
		id: "13",
		name: "Tofu",
		expiryDate: "2025-11-01",
		image: require("@/assets/images/food13.png"),
	},
	{
		id: "14",
		name: "Oreo",
		expiryDate: "2026-01-15",
		image: require("@/assets/images/food14.png"),
	},
	{
		id: "15",
		name: "Apples",
		expiryDate: "2025-10-25",
		image: require("@/assets/images/food15.png"),
	},
	{
		id: "16",
		name: "Rice",
		expiryDate: "2026-12-31",
		image: require("@/assets/images/food16.png"),
	},
];
