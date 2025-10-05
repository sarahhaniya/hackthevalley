import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<>
			<Stack>
				{/* Tabs group */}
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false, // ✅ Hide the "(tabs)" title completely
					}}
				/>

				{/* Scanner */}
				<Stack.Screen
					name="scanner"
					options={{
						title: "Scan Receipt",
						headerShown: false, // ✅ Hide header so only your ✕ close button shows
						presentation: "modal", // optional — makes it slide up from bottom
					}}
				/>

				{/* Not found */}
				<Stack.Screen
					name="pageNotFound"
					options={{ headerShown: false }}
				/>
			</Stack>

			{/* Global Toast handler */}
			<Toast />

			<StatusBar style="auto" />
		</>
	);
}
