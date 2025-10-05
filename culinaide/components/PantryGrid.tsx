import React, { useMemo } from "react";
import { View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { FoodItem } from "@/data/sampleItems";
import { homeStyles } from "@styles/home.styles";

type PantryGridProps = {
	items: FoodItem[];
	selectedItem: string | null;
	toggleItem: (id: string) => void;
	handleDeleteItem: (id: string) => void;
};

// assume avg 1.0 kg CO₂/kg waste saved (based on food waste LCA)
const CO2_EMISSION_FACTOR = 1.0; // kg CO₂ per kg food
const DEFAULT_ITEM_WEIGHT_KG = 0.2; // assume 200 g per item if unknown

export function PantryGrid({
	items,
	selectedItem,
	toggleItem,
	handleDeleteItem,
}: PantryGridProps) {
	const rows: FoodItem[][] = useMemo(() => {
		const sorted = [...items].sort(
			(a, b) =>
				new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
		);
		const chunks: FoodItem[][] = [];
		for (let i = 0; i < sorted.length; i += 3) {
			chunks.push(sorted.slice(i, i + 3));
		}
		return chunks;
	}, [items]);

	// when deleting an item, show CO₂ saved
	const confirmDelete = (item: FoodItem) => {
		handleDeleteItem(item.id);

		const savedCO2_kg = CO2_EMISSION_FACTOR * DEFAULT_ITEM_WEIGHT_KG;
		const savedCO2_g = Math.round(savedCO2_kg * 1000);

		Alert.alert(
			"🌱 Great Job!",
			`You saved up to ${savedCO2_g} g of CO₂ by using your ${item.name} before it expired!`
		);
	};

	return (
		<ScrollView contentContainerStyle={homeStyles.shelvesScroll}>
			{rows.map((row, idx) => (
				<View key={idx} style={homeStyles.shelfRow}>
					<Image
						source={require("@/assets/images/shelf.png")}
						style={homeStyles.shelfBg}
						resizeMode="cover"
					/>
					<View style={homeStyles.rowItems}>
						{row.map((item) => (
							<TouchableOpacity
								key={item.id}
								style={homeStyles.foodItem}
								onPress={() => toggleItem(item.id)}
								activeOpacity={0.8}
							>
								<Image
									source={item.image}
									style={homeStyles.foodIcon}
								/>
								{selectedItem === item.id && (
									<ThemedView style={homeStyles.hoverCard}>
										<ThemedText type="foodItem">
											{item.name}
										</ThemedText>
										<ThemedText style={homeStyles.expiryDate}>
											Expires: {item.expiryDate}
										</ThemedText>
										<TouchableOpacity
											style={homeStyles.deleteButton}
											onPress={() => confirmDelete(item)}
										>
											<ThemedText style={homeStyles.deleteX}>
												✕
											</ThemedText>
										</TouchableOpacity>
									</ThemedView>
								)}
							</TouchableOpacity>
						))}
					</View>
				</View>
			))}
		</ScrollView>
	);
}
