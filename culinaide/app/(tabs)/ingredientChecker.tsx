import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	Image,
	ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function IngredientChecker() {
	const [barcode, setBarcode] = useState("");
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCheckProduct = async () => {
		if (!barcode.trim()) {
			setError("Please enter a barcode");
			return;
		}
		setError(null);
		setLoading(true);
		setProduct(null);
		try {
			const res = await fetch(
				`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
			);
			const json = await res.json();
			if (json.status === 1) {
				setProduct(json.product);
			} else {
				setError("No product found. Try another barcode.");
			}
		} catch (err) {
			setError("Error fetching product. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const evaluateCriteria = (product: any) => {
		if (!product) return {};

		const allergens = product.allergens_tags || [];
		const labels = product.labels_tags || [];
		const nutriments = product.nutriments || {};
		const nutrientLevels = product.nutrient_levels || {};
		const ingredientsText = product.ingredients_text?.toLowerCase() || "";
		const packagingText = product.packaging_text?.toLowerCase() || "";

		// 🚫 Keyword lists
		const porkKeywords = [
			"pork",
			"gelatin",
			"lard",
			"bacon",
			"ham",
			"sausage",
			"pepperoni",
			"porcine",
			"pig",
		];
		const alcoholKeywords = [
			"alcohol",
			"wine",
			"beer",
			"rum",
			"brandy",
			"vodka",
			"whiskey",
			"whisky",
			"liqueur",
			"ethanol",
			"bourbon",
			"tequila",
			"malt",
			"cognac",
		];
		const dairyKeywords = [
			"milk",
			"cream",
			"cheese",
			"butter",
			"yogurt",
			"casein",
			"whey",
		];
		const meatKeywords = [
			"chicken",
			"beef",
			"pork",
			"fish",
			"meat",
			"lamb",
			"shrimp",
			"gelatin",
			"anchovy",
			"bacon",
		];
		const eggKeywords = ["egg", "albumen"];
		const honeyKeywords = ["honey"];
		const kosherCerts = [
			"ou",
			"star-k",
			"kof-k",
			"crc",
			"ok kosher",
			"triangle k",
		];

		// 🧠 Helper to check keywords
		const contains = (arr: string[], text: string) =>
			arr.some((kw) => text.includes(kw));

		const containsPork = contains(porkKeywords, ingredientsText);
		const containsAlcohol = contains(alcoholKeywords, ingredientsText);
		const containsDairy = contains(dairyKeywords, ingredientsText);
		const containsMeat = contains(meatKeywords, ingredientsText);
		const containsEgg = contains(eggKeywords, ingredientsText);
		const containsHoney = contains(honeyKeywords, ingredientsText);
		const hasKosherSymbol = contains(kosherCerts, packagingText);

		// 🕌 Halal logic
		let halalStatus = "unknown";
		if (labels.includes("en:halal")) halalStatus = "success";
		else if (containsPork || containsAlcohol) halalStatus = "fail";
		else if (ingredientsText && !containsPork && !containsAlcohol)
			halalStatus = "success";

		// 🕎 Kosher logic
		let kosherStatus = "unknown";
		if (labels.includes("en:kosher") || hasKosherSymbol)
			kosherStatus = "success";

		// 🌿 Vegetarian logic
		let vegetarianStatus = "unknown";
		if (labels.includes("en:vegetarian")) vegetarianStatus = "success";
		else if (containsMeat || containsPork || containsGelatin(ingredientsText))
			vegetarianStatus = "fail";
		else if (ingredientsText && !containsMeat && !containsPork)
			vegetarianStatus = "success";

		// 🥦 Vegan logic
		let veganStatus = "unknown";
		if (labels.includes("en:vegan")) veganStatus = "success";
		else if (
			containsMeat ||
			containsDairy ||
			containsEgg ||
			containsHoney ||
			containsPork ||
			containsGelatin(ingredientsText)
		)
			veganStatus = "fail";
		else if (
			ingredientsText &&
			!containsMeat &&
			!containsDairy &&
			!containsEgg &&
			!containsHoney &&
			!containsPork
		)
			veganStatus = "success";

		// 🍬 NEW "High Sugar" logic (your requested behavior)
		let sugarStatus = "unknown";
		if (nutrientLevels.sugars) {
			if (["high", "moderate"].includes(nutrientLevels.sugars)) {
				sugarStatus = "warning"; // ⚠️ high/moderate
			} else {
				sugarStatus = "fail"; // ❌ not high sugar
			}
		} else if (nutriments.sugars_100g !== undefined) {
			const sugar = nutriments.sugars_100g;
			if (sugar >= 5) sugarStatus = "warning"; // ⚠️ high/moderate
			else sugarStatus = "fail"; // ❌ low sugar
		} else {
			sugarStatus = "unknown";
		}

		return {
			"Peanut Free": !allergens.includes("en:peanuts") ? "success" : "fail",
			"Gluten Free": !allergens.includes("en:gluten") ? "success" : "fail",
			"Dairy Free": !containsDairy ? "success" : "fail",
			Halal: halalStatus,
			Kosher: kosherStatus,
			Vegetarian: vegetarianStatus,
			Vegan: veganStatus,
			"High Sugar": sugarStatus, // 🍬 now shows ⚠️ for high/moderate, ❌ if not
			"High Protein":
				nutriments.proteins_100g >= 12
					? "success"
					: nutriments.proteins_100g >= 6
					? "moderate"
					: "fail",
		};
	};

	// Helper to detect gelatin
	const containsGelatin = (text: string) =>
		text.includes("gelatin") || text.includes("gelatine");

	const getIconProps = (status: string) => {
		switch (status) {
			case "success":
				return { name: "check-circle", color: "#4CAF50" }; // green
			case "fail":
				return { name: "cancel", color: "#F44336" }; // red
			case "warning":
				return { name: "warning", color: "#FFC107" }; // yellow warning
			case "moderate":
				return { name: "radio-button-checked", color: "#FFC107" }; // yellow circle
			default:
				return { name: "help-outline", color: "#FF9800" }; // orange '?'
		}
	};

	const results = product ? evaluateCriteria(product) : {};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.container}
			>
				<ScrollView contentContainerStyle={styles.scroll}>
					<Text style={styles.title}>Ingredient Checker</Text>

					<TextInput
						style={styles.input}
						value={barcode}
						onChangeText={setBarcode}
						placeholder="Enter barcode manually..."
						keyboardType="numeric"
					/>

					<Pressable style={styles.button} onPress={handleCheckProduct}>
						<Text style={styles.buttonText}>Check Product</Text>
					</Pressable>

					{loading && <ActivityIndicator size="large" color="#d1383c" />}
					{error && <Text style={styles.error}>{error}</Text>}

					{product && (
						<View style={styles.result}>
							<Text style={styles.productName}>
								{product.product_name || "Unknown Product"}
							</Text>
							{product.image_front_url && (
								<Image
									source={{ uri: product.image_front_url }}
									style={styles.image}
								/>
							)}

							<View style={styles.criteria}>
								{Object.entries(results).map(([key, status]) => {
									const iconProps = getIconProps(status as string);
									return (
										<View key={key} style={styles.criteriaRow}>
											<MaterialIcons
												name={iconProps.name as any}
												size={22}
												color={iconProps.color}
												style={{ marginRight: 8 }}
											/>
											<Text style={styles.criteriaText}>{key}</Text>
										</View>
									);
								})}
							</View>
						</View>
					)}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	scroll: {
		padding: 20,
		alignItems: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		marginVertical: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		width: "90%",
		padding: 12,
		marginBottom: 12,
	},
	button: {
		backgroundColor: "#d1383c",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
	},
	buttonText: { color: "#fff", fontWeight: "600" },
	error: { color: "red", marginTop: 10 },
	result: { alignItems: "center", marginTop: 20 },
	productName: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
	image: { width: 150, height: 150, resizeMode: "contain", marginBottom: 16 },
	criteria: { alignItems: "flex-start", marginTop: 8 },
	criteriaRow: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 4,
	},
	criteriaText: { fontSize: 16, color: "#333" },
});
