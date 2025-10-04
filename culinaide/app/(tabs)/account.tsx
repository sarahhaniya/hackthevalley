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
				<ThemedText type="title" style={accountStyles.header}>
					Settings
				</ThemedText>
				<SettingsCard />
			</ScrollView>
		</SafeAreaView>
	);
}
