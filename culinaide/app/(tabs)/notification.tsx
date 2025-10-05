// culinaide/app/(tabs)/notification.tsx

import { ScrollView, Pressable } from "react-native";
import {
	notificationStyles as styles,
	COLORS,
} from "@/styles/notification.styles";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";

import { sampleItems, FoodItem } from "@/data/sampleItems";

// Extended type for notification screen
type Ingredient = FoodItem & {
	daysUntilExpiry: number;
};

type RecipeRecommendation = {
	id: string;
	name: string;
	ingredients: string[];
	difficulty: "easy" | "medium" | "hard";
};

// helper – safe calendar day difference
const calculateDaysUntilExpiry = (expiryDate: string): number => {
	const today = new Date();
	const todayUTC = Date.UTC(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);
	const expiry = new Date(expiryDate);
	const expiryUTC = Date.UTC(
		expiry.getFullYear(),
		expiry.getMonth(),
		expiry.getDate()
	);
	return Math.ceil((expiryUTC - todayUTC) / (1000 * 60 * 60 * 24));
};

export default function NotificationScreen() {
	const [expiringIngredients, setExpiringIngredients] = useState<Ingredient[]>(
		[]
	);

	useEffect(() => {
		// Calculate days until expiry for each item
		const withDays = sampleItems.map((item) => ({
			...item,
			daysUntilExpiry: calculateDaysUntilExpiry(item.expiryDate),
		}));

		// Filter → only show items expiring in next 3 days or expired
		const filtered = withDays
			.filter((item) => item.daysUntilExpiry <= 3)
			// Sort ascending: expired (-2, -1, 0) → today (0) → 1 → 2 → 3
			.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

		setExpiringIngredients(filtered);
	}, []);

	const [recommendations, setRecommendations] = useState<
		RecipeRecommendation[]
	>([
		{
			id: "1",
			name: "Tomato & Spinach Scramble",
			ingredients: [
				"Eggs",
				"Spinach",
				"Tomatoes",
				"Olive Oil",
				"Salt",
				"Pepper",
			],
			difficulty: "medium",
		},
		{
			id: "2",
			name: "Strawberry Banana Milkshake",
			ingredients: ["Strawberries", "Bananas", "Milk", "Honey"],
			difficulty: "easy",
		},
	]);

	const getExpiryColor = (days: number) => {
		if (days <= 0) return COLORS.accent; // expired or today
		if (days <= 2) return COLORS.secondaryDark; // 1–2 days left
		return COLORS.primaryDark;
	};

	const navigateToRecipeChat = (recipe?: RecipeRecommendation) => {
		router.push("/chatbot");
	};

	return (
		<ScrollView style={styles.container}>
			{/* Expiring Soon */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Expiring Soon</ThemedText>
				{expiringIngredients.length === 0 ? (
					<ThemedText>No items expiring soon 🎉</ThemedText>
				) : (
					expiringIngredients.map((ingredient) => (
						<Pressable
							key={ingredient.id}
							style={styles.ingredientCard}
							onPress={() => navigateToRecipeChat()}
						>
							<MaterialIcons
								name="error"
								size={24}
								color={getExpiryColor(ingredient.daysUntilExpiry)}
							/>
							<ThemedView style={styles.ingredientInfo}>
								<ThemedText style={styles.ingredientName}>
									{ingredient.name}
								</ThemedText>
								<ThemedText
									style={{
										color: getExpiryColor(ingredient.daysUntilExpiry),
										fontWeight: "500",
									}}
								>
									{ingredient.daysUntilExpiry <= 0
										? "Expired!"
										: `Expires in ${ingredient.daysUntilExpiry} day${ingredient.daysUntilExpiry > 1 ? "s" : ""
										}`}
								</ThemedText>
							</ThemedView>
						</Pressable>
					))
				)}
			</ThemedView>

			{/* Recommended Recipes */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Recommended Recipes</ThemedText>
				{recommendations.map((recipe) => (
					<Pressable
						key={recipe.id}
						style={styles.recipeCard}
						onPress={() => navigateToRecipeChat(recipe)}
					>
						<ThemedView style={styles.recipeHeader}>
							<ThemedText style={styles.recipeName}>{recipe.name}</ThemedText>
							<ThemedText style={styles.difficultyTag}>
								{recipe.difficulty}
							</ThemedText>
						</ThemedView>
						<ThemedText style={styles.ingredientsList}>
							Uses: {recipe.ingredients.join(", ")}
						</ThemedText>
						<ThemedText style={styles.tapPrompt}>
							Tap to get the recipe →
						</ThemedText>
					</Pressable>
				))}
			</ThemedView>
		</ScrollView>
	);
}