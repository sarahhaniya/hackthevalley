import React from "react";
import type { ColorSchemeName } from "react-native";
import { Theme } from "../constants/theme";
import { IconSymbol } from "../components/ui/icon-symbol";
import type { SymbolViewProps } from "expo-symbols";


export function createTabOptions(colorScheme: ColorSchemeName) {
	return {
		tabBarActiveTintColor: Theme[colorScheme ?? "light"].tint,
		headerShown: false,
	};
}

export const screenConfigs = {
	home: {
		title: "Home",
		icon: "house.fill",
	},
	account: {
		title: "Account",
		icon: "person.circle",
	},
	chatbot: {
		title: "Chatbot",
		icon: "message.circle",
	},
	notifications: {
		title: "Notifications",
		icon: "bell.fill",
	},
};


export function makeIcon(name: SymbolViewProps["name"]) {
	return ({ color, size }: { color: string; size: number }) => (
		<IconSymbol name={name} size={size} color={color} />
	);
}
  