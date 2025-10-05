import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function TabLayout() {
  return (
		<Tabs
			screenOptions={{
				headerShown: false, // ✅ tabs themselves don’t show headers
				tabBarActiveTintColor: "#d1383c",
				tabBarInactiveTintColor: "#999999",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="person" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="chatbot"
				options={{
					title: "Chatbot",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="chat" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					title: "Alerts",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="notifications"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
  );
}
