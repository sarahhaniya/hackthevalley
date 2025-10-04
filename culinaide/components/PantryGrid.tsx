// components/PantryGrid.tsx
import React, { useMemo } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
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

const ITEMS_PER_ROW = 3;

export function PantryGrid({
	items,
	selectedItem,
	toggleItem,
	handleDeleteItem,
}: PantryGridProps) {
	// sort once, then chunk into rows
	const rows: FoodItem[][] = useMemo(() => {
		const sorted = [...items].sort(
			(a, b) =>
				new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
		);
		const chunks: FoodItem[][] = [];
		for (let i = 0; i < sorted.length; i += ITEMS_PER_ROW) {
			chunks.push(sorted.slice(i, i + ITEMS_PER_ROW));
		}
		return chunks;
	}, [items]);

	return (
		<ScrollView contentContainerStyle={homeStyles.shelvesScroll}>
			{rows.map((row, idx) => (
				<View key={idx} style={homeStyles.shelfRow}>
					{/* Shelf background behind this row */}
					<Image
						source={require("@/assets/images/shelf.png")}
						style={homeStyles.shelfBg}
						resizeMode="cover"
					/>
					{/* Row items on top */}
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
											onPress={() => handleDeleteItem(item.id)}
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
