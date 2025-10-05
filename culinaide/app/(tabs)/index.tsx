import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedText, ThemedView } from "@/components";
import { FoodItem, sampleItems } from "@/data/sampleItems";
import { homeStyles } from "@/styles/home.styles";
import { PantryGrid } from "@/components/PantryGrid";

export default function HomeScreen() {
	const params = useLocalSearchParams();
	const [items, setItems] = useState<FoodItem[]>(sampleItems);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [showScanned, setShowScanned] = useState(false);

	useEffect(() => {
		if (params.mergeScanned === "1") {
			setShowScanned(true);
		}
	}, [params.mergeScanned]);

	// Items visible in grid (based on flag)
	const visibleItems = items.filter((it) => !it.scanned || showScanned);

	const handleDeleteItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
		setSelectedItem(null);
	};

	const toggleItem = (id: string) => {
		setSelectedItem((cur) => (cur === id ? null : id));
	};

	const resetPantry = () => {
		setShowScanned(false);
		setItems(sampleItems);
	};

	return (
		<ThemedView style={homeStyles.container}>
			{/* Header */}
			<View style={homeStyles.header}>
				<ThemedText type="title">My Food</ThemedText>
				<View style={homeStyles.headerButtons}>
					<TouchableOpacity
						style={homeStyles.resetButton}
						onPress={resetPantry}
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
				items={visibleItems}
				selectedItem={selectedItem}
				toggleItem={toggleItem}
				handleDeleteItem={handleDeleteItem}
			/>
		</ThemedView>
	);
}
