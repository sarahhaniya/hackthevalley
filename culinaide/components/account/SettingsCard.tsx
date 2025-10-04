// components/account/SettingsCard.tsx
import { useState, useEffect } from "react";
import { TextInput, Pressable, Switch, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { settingsStyles as styles } from "@/styles/settings.styles";

type Allergy = {
	id: string;
	name: string;
	selected: boolean;
};

type Diet = {
	id: string;
	name: string;
	selected: boolean;
};

export default function SettingsCard() {
	const [familySize, setFamilySize] = useState("4");
	const [allergies, setAllergies] = useState<Allergy[]>([
		{ id: "1", name: "Peanuts", selected: false },
		{ id: "2", name: "Dairy", selected: false },
		{ id: "3", name: "Gluten", selected: false },
		{ id: "4", name: "Shellfish", selected: false },
	]);
	const [diets, setDiets] = useState<Diet[]>([
		{ id: "1", name: "Vegetarian", selected: false },
		{ id: "2", name: "Vegan", selected: false },
		{ id: "3", name: "Halal", selected: false },
		{ id: "4", name: "Kosher", selected: false },
		{ id: "5", name: "Keto", selected: false },
		{ id: "6", name: "Gluten-Free", selected: false },
	]);

	// keep original state to compare for changes
	const [originalPreferences, setOriginalPreferences] = useState<any>(null);

	// check if current state differs from saved
	const hasChanges = () => {
		if (!originalPreferences) return false;
		const selectedAllergies = allergies
			.filter((a) => a.selected)
			.map((a) => a.name);
		const selectedDiets = diets.filter((d) => d.selected).map((d) => d.name);
		const current = {
			familySize,
			allergies: selectedAllergies,
			diets: selectedDiets,
		};
		return JSON.stringify(current) !== JSON.stringify(originalPreferences);
	};

	// toggles
	const toggleAllergy = (id: string) => {
		setAllergies((prev) =>
			prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
		);
	};
	const toggleDiet = (id: string) => {
		setDiets((prev) =>
			prev.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d))
		);
	};

	// save preferences
	const handleSave = async () => {
		try {
			const selectedAllergies = allergies
				.filter((a) => a.selected)
				.map((a) => a.name);
			const selectedDiets = diets
				.filter((d) => d.selected)
				.map((d) => d.name);
			const preferences = {
				familySize,
				allergies: selectedAllergies,
				diets: selectedDiets,
			};

			await AsyncStorage.setItem(
				"userPreferences",
				JSON.stringify(preferences)
			);
			setOriginalPreferences(preferences); // update baseline
			Alert.alert("Success", "Preferences saved! ✅");
		} catch (err) {
			console.error("Failed to save preferences:", err);
			Alert.alert("Error", "Could not save preferences.");
		}
	};

	// load preferences when screen mounts
	useEffect(() => {
		const loadPreferences = async () => {
			try {
				const saved = await AsyncStorage.getItem("userPreferences");
				if (saved) {
					const parsed = JSON.parse(saved);
					setFamilySize(parsed.familySize || "4");

					setAllergies((prev) =>
						prev.map((a) => ({
							...a,
							selected: parsed.allergies?.includes(a.name) || false,
						}))
					);
					setDiets((prev) =>
						prev.map((d) => ({
							...d,
							selected: parsed.diets?.includes(d.name) || false,
						}))
					);

					setOriginalPreferences(parsed);
				} else {
					// initialize baseline
					setOriginalPreferences({
						familySize: "4",
						allergies: [],
						diets: [],
					});
				}
			} catch (err) {
				console.error("Failed to load preferences:", err);
			}
		};
		loadPreferences();
	}, []);

	return (
		<ThemedView style={styles.container}>
			{/* Family Size */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Family Size</ThemedText>
				<TextInput
					style={styles.input}
					value={familySize}
					onChangeText={setFamilySize}
					keyboardType="number-pad"
					placeholder="Number of people"
				/>
			</ThemedView>

			{/* Dietary Restrictions */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>
					Dietary Restrictions
				</ThemedText>
				{diets.map((diet) => (
					<View key={diet.id} style={styles.toggleRow}>
						<ThemedText>{diet.name}</ThemedText>
						<Switch
							value={diet.selected}
							onValueChange={() => toggleDiet(diet.id)}
						/>
					</View>
				))}
			</ThemedView>

			{/* Allergies */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Allergies</ThemedText>
				{allergies.map((allergy) => (
					<View key={allergy.id} style={styles.toggleRow}>
						<ThemedText>{allergy.name}</ThemedText>
						<Switch
							value={allergy.selected}
							onValueChange={() => toggleAllergy(allergy.id)}
						/>
					</View>
				))}
			</ThemedView>

			<Pressable
				style={[
					styles.saveButton,
					{ opacity: hasChanges() ? 1 : 0.5 }, // dim if disabled
				]}
				onPress={handleSave}
				disabled={!hasChanges()}
			>
				<ThemedText style={styles.saveButtonText}>
					Save Preferences
				</ThemedText>
			</Pressable>
		</ThemedView>
	);
}
