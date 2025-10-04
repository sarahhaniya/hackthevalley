import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
	type?: "default" | "title" | "link";
};

export function ThemedText({
	style,
	type = "default",
	...rest
}: ThemedTextProps) {
	return <Text style={[styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		color: "#1a1a1a",
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		color: "#000",
	},
	link: {
		fontSize: 16,
		color: "#86c0f9ff",
		textDecorationLine: "underline",
	},
});
