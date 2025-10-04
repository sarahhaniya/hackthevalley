// components/account/ProfileCard.tsx
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // ensures refresh on screen focus
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import React from "react";

const COLORS = {
	primary: "#a2bcf7",
	black: "#1a1a1a",
	white: "#ffffff",
	gray: "#666666",
};

export default function ProfileCard() {
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john.doe@example.com");

	// load profile from AsyncStorage
	const loadProfile = async () => {
		try {
			const saved = await AsyncStorage.getItem("userProfile");
			if (saved) {
				const parsed = JSON.parse(saved);
				setName(parsed.name || "John Doe");
				setEmail(parsed.email || "john.doe@example.com");
			}
		} catch (err) {
			console.error("Failed to load profile:", err);
		}
	};

	// load once on mount
	useEffect(() => {
		loadProfile();
	}, []);

	// reload every time screen regains focus
	useFocusEffect(
		React.useCallback(() => {
			loadProfile();
		}, [])
	);

	return (
		<Pressable onPress={() => router.push("/(account)/account-edit")}>
			<ThemedView
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 16,
					marginHorizontal: 16,
					marginBottom: 16,
					backgroundColor: COLORS.white,
					borderRadius: 12,
					gap: 16,
					shadowColor: COLORS.black,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 3,
				}}
			>
				<MaterialIcons name="person" size={60} color={COLORS.primary} />
				<ThemedView style={{ flex: 1 }}>
					<ThemedText
						style={{
							color: COLORS.black,
							fontSize: 20,
							fontWeight: "600",
						}}
					>
						{name}
					</ThemedText>
					<ThemedText style={{ color: COLORS.gray, fontSize: 14 }}>
						{email}
					</ThemedText>
				</ThemedView>
				<MaterialIcons name="chevron-right" size={28} color={COLORS.gray} />
			</ThemedView>
		</Pressable>
	);
}
