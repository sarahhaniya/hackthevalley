// app/(tabs)/index.tsx
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText, ThemedView } from "@/components";
import { FoodItem, sampleItems } from "@/data/sampleItems";
import { homeStyles } from "@/styles/home.styles";
import { PantryGrid } from "@/components/PantryGrid";

export default function HomeScreen() {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [items, setItems] = useState<FoodItem[]>(sampleItems);

	const handleDeleteItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
		setSelectedItem(null);
	};

	const toggleItem = (id: string) => {
		setSelectedItem(selectedItem === id ? null : id);
	};

	return (
		<ThemedView style={homeStyles.container}>
			{/* Header */}
			<View style={homeStyles.header}>
				<ThemedText type="title">My Pantry</ThemedText>
				<View style={homeStyles.headerButtons}>
					<TouchableOpacity
						style={homeStyles.resetButton}
						onPress={() => setItems(sampleItems)}
					>
						<MaterialIcons name="refresh" size={24} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity
						style={homeStyles.scannerButton}
						onPress={() => router.push("/scanner")}
					>
						<MaterialIcons
							name="qr-code-scanner"
							size={24}
							color="#000"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Pantry Grid */}
			<PantryGrid
				items={items}
				selectedItem={selectedItem}
				toggleItem={toggleItem}
				handleDeleteItem={handleDeleteItem}
			/>
		</ThemedView>
	);
}
