import { View, type ViewProps, StyleSheet } from "react-native";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
	return <View style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
