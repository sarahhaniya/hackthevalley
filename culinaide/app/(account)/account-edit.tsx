// app/(account)/account-edit.tsx
import { useState, useEffect } from "react";
import { TextInput, Pressable, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { accountEditStyles as styles } from "../../styles/account-edit.styles";
import { Stack } from "expo-router";

export default function AccountEditScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [originalData, setOriginalData] = useState<any>(null);

	// Check if changes exist
	const hasChanges = () => {
		if (!originalData) return false;
		const current = { name, email };
		return (
			JSON.stringify(current) !== JSON.stringify(originalData) ||
			newPassword.length > 0 ||
			confirmPassword.length > 0
		);
	};

	const handleSave = async () => {
		try {
			setError("");

			// Only check that new password matches confirm password
			if (newPassword || confirmPassword) {
				if (newPassword !== confirmPassword) {
					setError("New passwords do not match");
					return;
				}
			}

			const profile = { name, email };

			// Save to AsyncStorage
			await AsyncStorage.setItem("userProfile", JSON.stringify(profile));

			// Reset baseline
			setOriginalData(profile);
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");

			Alert.alert("Success", "Profile updated successfully! ✅");
			router.back();
		} catch {
			setError("Failed to update profile");
		}
	};

	// Load saved profile
	useEffect(() => {
		const loadProfile = async () => {
			try {
				const saved = await AsyncStorage.getItem("userProfile");
				if (saved) {
					const parsed = JSON.parse(saved);
					setName(parsed.name || "");
					setEmail(parsed.email || "");
					setOriginalData(parsed);
				} else {
					// defaults
					const defaults = {
						name: "John Doe",
						email: "john.doe@example.com",
					};
					setName(defaults.name);
					setEmail(defaults.email);
					setOriginalData(defaults);
				}
			} catch (err) {
				console.error("Failed to load profile:", err);
			}
		};

		loadProfile();
	}, []);

	return (
		<>
			<Stack.Screen
				options={{
					title: "Edit Profile", 
					headerBackTitle: "Back",
					headerTintColor: "#d1383c",
				}}
			/>

			<ScrollView style={styles.container}>
				<ThemedText style={styles.title}>Edit Profile</ThemedText>

				{error ? (
					<ThemedText style={styles.error}>{error}</ThemedText>
				) : null}

				<Pressable style={styles.avatarContainer}>
					<ThemedView style={styles.avatar}>
						<MaterialIcons name="person" size={80} color="#d1383c" />
					</ThemedView>
					<ThemedText style={styles.changePhotoText}>
						Change Photo
					</ThemedText>
				</Pressable>

				{/* Name */}
				<ThemedView style={styles.section}>
					<ThemedText style={styles.label}>Name</ThemedText>
					<TextInput
						style={styles.input}
						value={name}
						onChangeText={setName}
						placeholder="Your name"
					/>
				</ThemedView>

				{/* Email */}
				<ThemedView style={styles.section}>
					<ThemedText style={styles.label}>Email</ThemedText>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						placeholder="Your email"
					/>
				</ThemedView>

				{/* Password Section */}
				<ThemedView style={styles.section}>
					<ThemedText style={styles.sectionTitle}>
						Change Password
					</ThemedText>

					<ThemedText style={styles.label}>Current Password</ThemedText>
					<TextInput
						style={styles.input}
						value={currentPassword}
						onChangeText={setCurrentPassword}
						secureTextEntry
						placeholder="Enter current password"
					/>

					<ThemedText style={styles.label}>New Password</ThemedText>
					<TextInput
						style={styles.input}
						value={newPassword}
						onChangeText={setNewPassword}
						secureTextEntry
						placeholder="Enter new password"
					/>

					<ThemedText style={styles.label}>
						Confirm New Password
					</ThemedText>
					<TextInput
						style={styles.input}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
						placeholder="Confirm new password"
					/>
				</ThemedView>

				<Pressable
					style={[styles.saveButton, { opacity: hasChanges() ? 1 : 0.5 }]}
					onPress={handleSave}
					disabled={!hasChanges()}
				>
					<ThemedText style={styles.saveButtonText}>
						Save Changes
					</ThemedText>
				</Pressable>
			</ScrollView>
		</>
	);
}
