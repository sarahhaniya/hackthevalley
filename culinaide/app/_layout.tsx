import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Keep splash screen visible while we load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	// Once mounted, hide the splash
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<>
			<Stack>
				{/* Tabs group */}
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				{/* Account/profile group (later) */}
				<Stack.Screen name="(account)" options={{ headerShown: false }} />
				{/* Scanner screen */}
				<Stack.Screen name="scanner" />
				{/* Not found screen */}
				<Stack.Screen name="pageNotFound" />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
