// app/(tabs)/account.tsx
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import ProfileCard from "@/components/account/ProfileCard";
import SettingsCard from "@/components/account/SettingsCard";
import { accountStyles } from "@/styles/account.styles";
import { Background } from "@react-navigation/elements";

export default function AccountScreen() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}
			>
				<ThemedText type="title" style={accountStyles.header}>
					Account
				</ThemedText>
				<ProfileCard />
				<ThemedView
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						padding: 16,
						marginHorizontal: 16,
						marginBottom: 16,
						backgroundColor: "#ffffff",
						borderRadius: 12,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 4,
						elevation: 3,
					}}
				>
					<ThemedText
						style={{
							fontSize: 18,
							fontWeight: "600",
							color: "#1a1a1a",
						}}
					>
						Collect Points
					</ThemedText>

					<ThemedText
						style={{
							fontSize: 14,
							color: "#888",
							fontWeight: "500",
							fontStyle: "italic",
						}}
					>
						Coming soon
					</ThemedText>
				</ThemedView>

				<ThemedText type="title" style={accountStyles.header}>
					Settings
				</ThemedText>
				<SettingsCard />
			</ScrollView>
		</SafeAreaView>
	);
}
