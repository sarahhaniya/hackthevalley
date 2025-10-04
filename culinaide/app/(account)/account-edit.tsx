// app/(account)/account-edit.tsx
import { useState } from "react";
import { TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { accountEditStyles as styles } from "../../styles/account-edit.styles";


export default function AccountEditScreen() {
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john.doe@example.com");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSave = async () => {
		try {
			// Validate passwords if being changed
			if (newPassword || confirmPassword) {
				if (!currentPassword) {
					setError("Current password is required to change password");
					return;
				}
				if (newPassword !== confirmPassword) {
					setError("New passwords do not match");
					return;
				}
			}

			// Save profile logic here
			router.back();
		} catch {
			setError("Failed to update profile");
		}
	};

	return (
		<ScrollView style={styles.container}>
			<ThemedText style={styles.title}>Edit Profile</ThemedText>

			{error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

			<Pressable style={styles.avatarContainer}>
				<ThemedView style={styles.avatar}>
					<MaterialIcons name="person" size={80} color="#a2bcf7" />
				</ThemedView>
				<ThemedText style={styles.changePhotoText}>Change Photo</ThemedText>
			</Pressable>

			<ThemedView style={styles.section}>
				<ThemedText style={styles.label}>Name</ThemedText>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={setName}
					placeholder="Your name"
				/>
			</ThemedView>

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

			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Change Password</ThemedText>

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

				<ThemedText style={styles.label}>Confirm New Password</ThemedText>
				<TextInput
					style={styles.input}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					placeholder="Confirm new password"
				/>
			</ThemedView>

			<Pressable style={styles.saveButton} onPress={handleSave}>
				<ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
			</Pressable>
		</ScrollView>
	);
}
