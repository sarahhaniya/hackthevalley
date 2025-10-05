import { useState } from "react";
import {
	View,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { scannerStyles as styles } from "@/styles/scanner.styles";
import { FoodItem, sampleItems } from "@/data/sampleItems";

export default function ScannerScreen() {
	const [loading, setLoading] = useState(false);
	const [scannedItems, setScannedItems] = useState<FoodItem[]>([]);
	const [error, setError] = useState<string | null>(null);

	const pickImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				simulateScan();
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to select image"
			);
		}
	};

	const simulateScan = () => {
		setLoading(true);
		setError(null);

		// Fake scanned items for demo
		const updated = sampleItems.map((it) =>
			["Rice", "Oreo", "Frozen Soy Beans"].includes(it.name)
				? { ...it, scanned: true }
				: it
		);
		const scanned = updated.filter((it) => it.scanned);
		setScannedItems(scanned);

		setTimeout(() => {
			setLoading(false);

			// ✅ Show success toast
			Toast.show({
				type: "success",
				text1: "Upload Successful 🎉",
				text2: "Your receipt was scanned and items added!",
				position: "bottom",
				autoHide: true,
				//visibilityTime: 5,
			});

			// // Navigate back to home after a short delay
			// setTimeout(() => {
			// 	router.replace({ pathname: "/", params: { mergeScanned: "1" } });
			// }, 2500);
		}, 1000);
	};

	return (
		<ThemedView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.circleButton}
					onPress={() => router.back()}
				>
					<ThemedText style={styles.closeText}>✕</ThemedText>
				</TouchableOpacity>
			</View>

			{/* Content */}
			<View style={styles.content}>
				{loading ? (
					<View style={styles.loading}>
						<ActivityIndicator size="large" color="#000" />
						<ThemedText style={styles.loadingText}>
							Analyzing receipt...
						</ThemedText>
					</View>
				) : scannedItems.length > 0 ? (
					<View style={styles.results}>
						<ThemedText type="title" style={styles.resultsTitle}>
							Items Added:
						</ThemedText>
						{scannedItems.map((item) => (
							<View key={item.id} style={styles.itemRow}>
								<ThemedText style={styles.itemName}>
									{item.name}
								</ThemedText>
								<ThemedText style={styles.expiryDate}>
									{new Date(item.expiryDate).toLocaleDateString()}
								</ThemedText>
							</View>
						))}
						<TouchableOpacity
							style={styles.scanButton}
							onPress={pickImage}
						>
							<ThemedText>Scan Another Receipt</ThemedText>
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						style={styles.uploadButton}
						onPress={pickImage}
					>
						<MaterialIcons name="photo-library" size={24} color="#000" />
						<ThemedText style={styles.uploadText}>
							Select Receipt Image
						</ThemedText>
					</TouchableOpacity>
				)}
			</View>
		</ThemedView>
	);
}
